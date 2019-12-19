

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
  const fleetNames = ["我的船队", "他的船", "a"];
  let len = 3;
  $("#add-fleet-btn").click(function (e) {
    let newFleetName = $("#add-ship-fleet-name").val();
    $("#add-ship-fleet-name").val("");
    let i = 0;
    for (i = 0; i < len; i++) {
      // console.log($(".my-ship-list").find(`.layui-colla-title:eq(${i})`).text().substr(0, newFleetName.length), newFleetName);
      if (newFleetName == fleetNames[i]) {
        break;
      }
    }
    if (i == len) {
      let wrapper = $("<div class='layui-colla-item'></div>");
      let newFleet = $("<h2 class='layui-colla-title'></h2>").text(newFleetName);
      let content = $("<div class='layui-colla-content'></div>").text("hello");
      let eye = $("<button class='tree-button'></button>").html('<img src="./Images/icon_hide.png" class="tree-button-icon">');
      wrapper.append(newFleet.append(eye)).append(content);
      $(".my-ship-list").append(wrapper);
    }
  });
});

layui.use(['element', 'layer', 'form'], function () {
  var element = layui.element;
  var layer = layui.layer;
  var form = layui.form;
});