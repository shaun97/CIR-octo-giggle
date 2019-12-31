function mapInitAjax() {
  console.time("init AJAX");
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/getDateJson`,
    //  url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.timeEnd("init AJAX");
      ALL_SHIPS = data.data; // Change back
      if (!ALL_SHIPS) {
        alert("Please refresh page");
        return;
      }
      mapLayersInit();
    },
    error: function () {
      alert("Cannot load ship data");
    }
  });
}

function chaInfoAjax(id) {
  console.time("Search AJAX");
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/getMMSI?MmsiIorName=` + id,
    // url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.timeEnd("Search AJAX");
      drawTrack(data);
    },
    error: function () {
      alert("Error please try again");
      $('#clr-track-btn').click();
    }
  });
}