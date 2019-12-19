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
      let showing = false;
      let newFleet = $('<h2/>').addClass("layui-colla-title").text(newFleetName);
      let content = $('<div/>').addClass("layui-colla-content").html("<p>hello</p>");
      let icon = $('<i/>').addClass("layui-icon").addClass("layui-colla-icon").html("");
      newFleet.click(function() {
        if (!showing) {
          content.addClass("layui-show");
          icon.html("");
        } else {
          content.attr("class", "layui-colla-content");
          icon.html("")
        }
        showing = !showing;
      })
      newFleet.append(icon);
      $('.my-ship-list').append(
        $('<div/>')
          .addClass("layui-colla-item")
          .append(newFleet)
          .append(content)
      );
    }
  });
});

layui.use(['element', 'layer'], function () {
  var element = layui.element;
  var layer = layui.layer;
});