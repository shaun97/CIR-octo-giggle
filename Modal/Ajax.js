function mapInitAjax() {
  // $(function () {
    // console.log("1");
    $.ajax({
      url: `http://${IP_ADDRESS}/ships/getDateJson`,
      type: "GET",//请求方式为get
      dataType: "json", //返回数据格式为json
      success: function (data) {
        ALL_SHIPS = data.data; // Change back
        mapLayersInit();
      },
      error: function () {
        alert("Cannot load ship data");
      }
    });
  // });
}

function chaInfoAjax(id) {
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/getMMSI?MmsiIorName=` + id,
    // url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      drawTrack(data);
    },
    error: function () {
      alert("Error please try again");
      $('#clr-track-btn').click();
    }
  });
}