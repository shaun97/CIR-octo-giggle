var ObserveListView = (function () {
  $(document).ready(function () {
    updateNumBoatsHeader();
    $("#observe-close-button").click(function () {
      $("#observe-list-box").hide();
    });
    $("#observe-add-ship").click(function () {
      $("#observe-write").show();
      $("#observe-read").hide();
    });

    $("#add-fleet-btn").click(function () {
      let newFleetName = $("#add-ship-fleet-name").val().trim();

      try {
        fleetNameId = ObserveList.addFleet(newFleetName);
      } catch (e) {
        alert(e);
        return;
      }
      printFleetNameTree(newFleetName, fleetNameId);
    });

    $("#add-ship-to-fleet-btn").click(function () {
      let fleetName = $("#add-ship-fleet-name").val().trim();
      try {
        item = ObserveList.addShipToFleet(fleetName);
        updateNumBoatsHeader();
      } catch (e) {
        alert(e);
        return;
      }
    })

    setFleetAutoComplete();
  });

  function setFleetAutoComplete() {
    $("#add-ship-fleet-name").autocomplete({
      source: FLEET_NAME_LIST,
      minLength: 0
    });
    $("#add-ship-fleet-name").click(() => {
      $("#add-ship-fleet-name").autocomplete('search', '');
    })
  }

  function setupCheckbox() {
    // $(".layui-form-checkbox").attr("onclick", "").unbind("click");
    $('.layui-form-checkbox').click(function () {
      console.time('click checkbox');
      if (!MAP_VIEW) ShipMapView.clearTrack();
      if ($(this).hasClass("layui-form-checked")) {
        ShipMap.setThisShipSel(null);
        ObserveList.hideOtherShips();
      } else {
        if (MAP_VIEW) {
          FiltrateBox.filterShips(ALL_SHIPS);
        }
      }
      console.timeEnd('click checkbox');
    });
  }

  function printShipsTree(fleetName, fleetNameId, item, boo) {
    item.data.NICKNAME = item.data.NICKNAME ? item.data.NICKNAME : item.data.NAME;
    item.data.NICKNAME = ($("#add-ship-to-fleet-inputbar").val() == "") ? item.data.NICKNAME : $("#add-ship-to-fleet-inputbar").val();
    let name = $('<div/>').addClass('ship-name').addClass('ship-mmsi-' + item.data.MMSI);
    let eye = $('<button/>').addClass("tree-button").addClass('eye-' + item.data.MMSI).html('<img src="./img/icon_hide.png" class="tree-button-icon">');
    let track = $('<button/>').addClass("tree-button").html('<img src="./img/icon_track_myship_track.png" class="tree-button-icon">');
    let edit = $('<button/>').addClass("tree-button").html('<img src="./img/icon_edit_myship_track.png" class="tree-button-icon">');
    let close = $('<button/>').addClass("tree-button").html('<img src="./img/icon_delt_myship_track.png" class="tree-button-icon">');
    let treeButtons = $('<div/>').addClass("tree-buttons").append(eye, track, edit, close);
    let ship = $('<div/>').addClass("ship-in-list").append(name).append(treeButtons);
    $(`#content-list-${fleetNameId}`).append(ship);
    if (boo) ShipInfoBox.showData(item.data);
    $('.ship-mmsi-' + item.data.MMSI).html(item.data.NICKNAME);
    //updateNumFleetHeader(fleetNameId, fleetName);

    //-------------- FUNCTIONALITY FOR SHIP TREE-BUTTONS --------------//

    ship.click(function () {
      if (!MAP_VIEW) {
        ShipMapView.clearTrack();
      }
      if (MAP.getZoom() < 9) MAP.setZoom(9);
      ShipMap.clickShipHandler(item);
    });

    function editShipOnClick() {
      ShipMap.setThisShipSel(item);
      ShipInfoBox.showData(THIS_SHIP_ITEM.data);
     $('#change-name-box').show();
    }
    edit.click(editShipOnClick);

    eye.click(function () {
      eye.html() == '<img src="./img/icon_open.png" class="tree-button-icon">'
        ? $('.eye-' + item.data.MMSI).html('<img src="./img/icon_hide.png" class="tree-button-icon">')
        : $('.eye-' + item.data.MMSI).html('<img src="./img/icon_open.png" class="tree-button-icon">');
        ObserveList.showIndivShips(item);
    });

    track.click(function () {
      MAP_VIEW == true
        ? track.html('<img src="./img/icon_track_myship_track.png" style="filter: sepia(100%) hue-rotate(190deg) saturate(500%)" class="tree-button-icon">')
        : track.html('<img src="./img/icon_track_myship_track.png" class="tree-button-icon">');
      ShipMap.clickShipHandler(item);
      $('#clr-track-btn').click(() => {
        track.html('<img src="./img/icon_track_myship_track.png" class="tree-button-icon">');
      })
      if (MAP_VIEW) {
        $('#inq-track-btn').click();
      } else {
        $('#clr-track-btn').click();
      }
    })

    close.click(function () {
      FLEETS[fleetName.replace(" ", "_")] = FLEETS[fleetName.replace(" ", "_")].filter(x => x != item);
      ship.remove();
      updateNumBoatsHeader();
      delShipAttention(fleetName, item.data.MMSI);
      // updateNumFleetHeader(fleetNameId, fleetName) 
    });

    $(".tree-button").click(function (e) {
      e.stopPropagation();
    });
    //-------------- END FUNCTIONALITY FOR SHIP TREE-BUTTONS --------------//
  }

  //Prints out the fleet
  function printFleetNameTree(newFleetName, fleetNameId) {
    let newFleet = $('<h2/>').addClass("layui-colla-title").attr("id", `fleet-header-${fleetNameId}`);
    let name = $('<div/>').addClass('fleet-name').html(newFleetName);
    let icon = $('<i/>').addClass("layui-icon").addClass("layui-colla-icon").html("");
    let eyeF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_hide.png" class="tree-button-icon">');
    let tableF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_info_myship_track.png" class="tree-button-icon">');
    let editF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_edit_myship_track.png" class="tree-button-icon">');
    let closeF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_delt_myship_track.png" class="tree-button-icon">');
    let treeButtonsF = $('<div/>').addClass("tree-buttons").append(eyeF, tableF, editF, closeF);
    let content = $('<div/>').addClass("layui-colla-content").attr("id", `content-list-${fleetNameId}`);
    let newItem = $('<div/>').addClass("layui-colla-item")
      .append(newFleet.append(name).append(treeButtonsF).append(icon))
      .append(content)
    $('.my-ship-list').append(newItem);
    //updateNumFleetHeader(fleetNameId, newFleetName) 

    //-------------- FUNCTIONALITY FOR FLEET TREE-BUTTONS --------------//

    newFleet.click(function () {
      content.toggleClass("layui-show");
      icon.html() == "" ? icon.html("") : icon.html(""); // Styling for Dropdown
    })

    function editFleetOnClick() {
      name.html('<input type="text" name="title" lay-verify="title" autocomplete="off" class="change-fleet-name">');
      $('.change-fleet-name').focus();
      name.keypress(function (e) {
        if (e.which == 13) {
          var newName = $('.change-fleet-name').val();
          var newNameId = newName.replace(" ", "_");
          name.html(newName);
          newFleet.attr("id", `fleet-header-${newNameId}`);
          content.attr("id", `content-list-${newNameId}`);
          ObserveList.editFleetName(newFleetName, newName);
        }
      });
    }
    editF.click(editFleetOnClick);

    var fleetDoShowBtn = true;
    eyeF.click(function () {
      eyeF.html() == '<img src="./img/icon_open.png" class="tree-button-icon">'
        ? eyeF.html('<img src="./img/icon_hide.png" class="tree-button-icon">')
        : eyeF.html('<img src="./img/icon_open.png" class="tree-button-icon">');

      fleetDoShowBtn = !fleetDoShowBtn;
      ObserveList.toggleFleet(FLEETS[fleetNameId], fleetDoShowBtn, fleetNameId);
    });

    closeF.click(function () {
      newItem.empty();
      newItem.remove();
      FLEET_NAME_LIST = FLEET_NAME_LIST.filter(x => x != newFleetName);
      delete FLEETS[fleetNameId];
      delGroupAttention(newFleetName);
      setFleetAutoComplete();
      updateNumBoatsHeader();
    });

    tableF.click((e) => {
      GroupInfo.showTable(FLEETS[fleetNameId], newFleetName);
      $("#group-info-box").show();
    });

    //-------------- END FUNCTIONALITY FOR FLEET TREE-BUTTONS --------------//

    $(".tree-button").click(function (e) {
      e.stopPropagation();
    });
  }

  $("#observe-add-ship-cancel-btn").click(function () {
    $("#observe-write").hide();
    $("#observe-read").show();
  })

  function updateNumBoatsHeader() {
    var noOfShipsInList = 0;
    Object.keys(FLEETS).forEach(function (key, index) {
      noOfShipsInList += FLEETS[key].length;
      console.log("updated num boats");
    })
    $("#observe-list-text").text("我的关注 （" + noOfShipsInList + "条）");
  }

  function updateNumFleetHeader(fleetNameId, fleetName) {
    var noOfShipsInFleet = FLEETS[fleetNameId].length;
    $(`#fleet-header-${fleetNameId}`).text(`${fleetName} （${noOfShipsInFleet}条）`);
  }
  return {
    setupCheckbox: setupCheckbox,
    printShipsTree: printShipsTree,
    printFleetNameTree: printFleetNameTree,
    updateNumBoatsHeader: updateNumBoatsHeader,
    updateNumFleetHeader: updateNumFleetHeader // NOT USED YET
  }
}());