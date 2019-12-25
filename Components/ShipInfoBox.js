$(document).ready(function () {
  $("#info-close-button").click(function () {
    $("#ship-info-box").hide();
    if (!MAP_VIEW) $("#clr-track-btn").click();
  });
  $("#info-edit-button").click(function () {
    $("#change-name-box").show();
  });
  $("#info-box-observe-btn").click(function () {
    $("#observe-write").show();
    $("#observe-read").hide();
    $("#observe-list-box").show()
  });
});

layui.use('laydate', function () {
  var laydate = layui.laydate;

  laydate.render({
    elem: '#ship-date-range'
    , range: true
    , theme: '#006ce7',
    success : function(layero, index) {
      console.log("hello");
      
      
    }
  });
});