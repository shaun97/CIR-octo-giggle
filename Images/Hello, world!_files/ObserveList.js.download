

$(document).ready(function () {
  $("#observe-close-button").click(function () {
    $("#observe-list-box").hide();
  });
  $("#observe-add-ship").click(function () {
    $("#observe-write").show();
    $("#observe-read").hide();
  });
  $(".tree-button").click(function (e) {
    e.stopPropagation();
  });
  const fleetNames = [];
  let len = 0;
  $("#add-fleet-btn").click(function (e) {
    let newFleetName = $("#add-ship-fleet-name").val();
    if (newFleetName == "") { return; }
    $("#add-ship-fleet-name").val("");
    let i = 0;
    for (i = 0; i < len; i++) {
      if (newFleetName == fleetNames[i]) { break; }
    }
    let eye = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_hide.png" class="tree-button-icon">');
    let track = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_track_myship_track.png" class="tree-button-icon">');
    let edit = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_edit_myship_track.png" class="tree-button-icon">');
    let close = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_delt_myship_track.png" class="tree-button-icon">');
    let treeButtons = $('<div/>').addClass("tree-buttons").append(eye, track, edit, close);
    let ship = $('<div/>').addClass("ship-in-list").html($("#ship-info-name").text()).append(treeButtons);

    //-------------- FUNCTIONALITY FOR SHIP TREE-BUTTONS --------------//

    close.click(function () {
      ship.remove();
    });

    //-------------- FUNCTIONALITY FOR SHIP TREE-BUTTONS --------------//
    if (i == len) {
      let showing = false;
      let newFleet = $('<h2/>').addClass("layui-colla-title").text(newFleetName);
      let icon = $('<i/>').addClass("layui-icon").addClass("layui-colla-icon").html("");
      let eyeF = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_hide.png" class="tree-button-icon">');
      let tableF = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_info_myship_track.png" class="tree-button-icon">');
      let editF = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_edit_myship_track.png" class="tree-button-icon">');
      let closeF = $('<button/>').addClass("tree-button").html('<img src="./Images/icon_delt_myship_track.png" class="tree-button-icon">');
      let treeButtonsF = $('<div/>').addClass("tree-buttons").append(eyeF, tableF, editF, closeF);
      let content = $('<div/>').addClass("layui-colla-content").attr("id", `content-list-${i}`).append(ship);
      let newItem = $('<div/>').addClass("layui-colla-item")
        .append(newFleet.append(treeButtonsF).append(icon))
        .append(content)
      $('.my-ship-list').append(newItem);
      len = fleetNames.push(newFleetName);

      //-------------- FUNCTIONALITY FOR FLEET TREE-BUTTONS --------------//

      newFleet.click(function () {
        if (!showing) {
          content.addClass("layui-show");
          icon.html("");
        } else {
          content.attr("class", "layui-colla-content");
          icon.html("")
        }
        showing = !showing;
      })

      closeF.click(function () {
        newItem.empty();
        newItem.remove();
      });

      tableF.click(() => {
        $("#group-info-box").show();
      });

      //-------------- END FUNCTIONALITY FOR FLEET TREE-BUTTONS --------------//

    } else {
      $(`#content-list-${i}`).append(ship);
    }
  });
});

layui.use(['element', 'layer', 'form'], function () {
  var element = layui.element;
  var layer = layui.layer;
  var form = layui.form;
});