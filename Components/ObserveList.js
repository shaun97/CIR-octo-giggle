const FLEETS = {};

$(document).ready(function () {
  $("#observe-close-button").click(function () {
    $("#observe-list-box").hide();
  });
  $("#observe-add-ship").click(function () {
    $("#observe-write").show();
    $("#observe-read").hide();
  });
  $("#add-fleet-btn").click(function () {
    let newFleetName = $("#add-ship-fleet-name").val().trim();
    const fleetNameId = newFleetName.replace(" ", "_");
    if (newFleetName == "" || $(`#content-list-${fleetNameId}`).length != 0) { return; }

    let newFleet = $('<h2/>').addClass("layui-colla-title").text(newFleetName);
    let icon = $('<i/>').addClass("layui-icon").addClass("layui-colla-icon").html("");
    let eyeF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_hide.png" class="tree-button-icon">');
    let tableF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_info_myship_track.png" class="tree-button-icon">');
    let editF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_edit_myship_track.png" class="tree-button-icon">');
    let closeF = $('<button/>').addClass("tree-button").html('<img src="./img/icon_delt_myship_track.png" class="tree-button-icon">');
    let treeButtonsF = $('<div/>').addClass("tree-buttons").append(eyeF, tableF, editF, closeF);
    let content = $('<div/>').addClass("layui-colla-content").attr("id", `content-list-${fleetNameId}`);
    let newItem = $('<div/>').addClass("layui-colla-item")
      .append(newFleet.append(treeButtonsF).append(icon))
      .append(content)
    $('.my-ship-list').append(newItem);

    FLEETS[fleetNameId] = [];

    //-------------- FUNCTIONALITY FOR FLEET TREE-BUTTONS --------------//

    // <i class="layui-icon layui-colla-icon"></i>
    // console.log('added functionality');
    newFleet.click(function () {
      // console.log('toggle');
      content.toggleClass("layui-show");
      icon.html() == "" ? icon.html("") : icon.html(""); // Styling for Dropdown
    })

    eyeF.click(function () {
      eyeF.html() == '<img src="./img/icon_open.png" class="tree-button-icon">'
        ? eyeF.html('<img src="./img/icon_hide.png" class="tree-button-icon">')
        : eyeF.html('<img src="./img/icon_open.png" class="tree-button-icon">');
    });

    closeF.click(function () {
      newItem.empty();
      newItem.remove();
    });

    tableF.click((e) => {
      // var history_data = [
      //       { MMSI: 565731000, TIME: "2019-12-20 08:28:04 GMT", LONGITUDE: 131.2823, LATITUDE: 28.84995 },
      //       { MMSI: 565731000, TIME: "2019-12-20 08:29:04 GMT", LONGITUDE: 130.7823, LATITUDE: 28.44995 },
      //       { MMSI: 565731000, TIME: "2019-12-20 08:25:04 GMT", LONGITUDE: 132.7823, LATITUDE: 28.94995 },
      //       { MMSI: 565731000, TIME: "2019-12-20 08:26:04 GMT", LONGITUDE: 132.2823, LATITUDE: 29.54995 },
      //       { MMSI: 565731000, TIME: "2019-12-20 08:27:04 GMT", LONGITUDE: 131.7823, LATITUDE: 29.44995 },
      //     ]
      showTable(FLEETS[fleetNameId], newFleetName);
      $("#group-info-box").show();
    });

    //-------------- END FUNCTIONALITY FOR FLEET TREE-BUTTONS --------------//

    $(".tree-button").click(function (e) {
      e.stopPropagation();
    });
  });

  $("#observe-add-ship-cancel-btn").click(function() {
    $("#observe-write").hide();
    $("#observe-read").show();
  })

  $("#add-ship-to-fleet-btn").click(function () {
    const fleetName = $("#add-ship-fleet-name").val().trim();
    if (!fleetName) {
      alert("Choose or add a fleet name");
      return;
    }
    const item = THIS_SHIP_ITEM;
    $("#add-fleet-btn").click();
    item.data.NICKNAME = ($("#add-ship-to-fleet-inputbar").val() == "") ? item.data.NICKNAME : $("#add-ship-to-fleet-inputbar").val();
    let eye = $('<button/>').addClass("tree-button").html('<img src="./img/icon_hide.png" class="tree-button-icon">');
    let track = $('<button/>').addClass("tree-button").html('<img src="./img/icon_track_myship_track.png" class="tree-button-icon">');
    let edit = $('<button/>').addClass("tree-button").html('<img src="./img/icon_edit_myship_track.png" class="tree-button-icon">');
    let close = $('<button/>').addClass("tree-button").html('<img src="./img/icon_delt_myship_track.png" class="tree-button-icon">');
    let treeButtons = $('<div/>').addClass("tree-buttons").append(eye, track, edit, close);
    let ship = $('<div/>').addClass("ship-in-list").html(item.data.NICKNAME == null ? item.data.NAME : item.data.NICKNAME).append(treeButtons);
    $(`#content-list-${fleetName.replace(" ", "_")}`).append(ship);
    FLEETS[fleetName.replace(" ", "_")].push(item);
    showData(item);
    // console.log("FLEETS after add ship", FLEETS);
    //-------------- FUNCTIONALITY FOR SHIP TREE-BUTTONS --------------//

    eye.click(function () {
      eye.html() == '<img src="./img/icon_open.png" class="tree-button-icon">'
        ? eye.html('<img src="./img/icon_hide.png" class="tree-button-icon">')
        : eye.html('<img src="./img/icon_open.png" class="tree-button-icon">');
    });

    track.click(function () {
      map.centerAndZoom(new BMap.Point(item.data.LONGITUDE, item.data.LATITUDE), 12);
      setThisShip(item);
      showData(item);
    })

    close.click(function () {
      console.log(FLEETS[fleetName.replace(" ", "_")]);
      FLEETS[fleetName.replace(" ", "_")] = FLEETS[fleetName.replace(" ", "_")].filter(x => x != item);
      ship.remove();
    });

    //-------------- END FUNCTIONALITY FOR SHIP TREE-BUTTONS --------------//

  })
});

// Needed for checkbox 
layui.use(['element', 'layer', 'form'], function () {
  var element = layui.element;
  var layer = layui.layer;
  var form = layui.form;
});