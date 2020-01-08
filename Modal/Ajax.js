function mapInitAjax() {
  console.time("init AJAX");
  $.ajax({
    //  url: `http://${IP_ADDRESS}/ships/getDateJson`,
    url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.timeEnd("init AJAX");
      ALL_SHIPS = data.data; // Change back
      if (!ALL_SHIPS || ALL_SHIPS.length == 0) {
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

  // console.time("Search AJAX");
  // open_load();
  // $.ajax({
  //   url: `http://${IP_ADDRESS}/ships/getMMSI?MmsiIorName=` + id,
  //   // url: 'http://localhost:3000/data',
  //   type: "GET",//请求方式为get
  //   dataType: "json", //返回数据格式为json
  //   success: function (data) {
  //     console.timeEnd("Search AJAX");
  //     close_load();
  //     drawTrack(data);
  //   },
  //   error: function () {
  //     close_load();
  //     alert("Error please try again");
  //     $('#clr-track-btn').click();
  //   }
  // });

  drawTrack({
    data: [
      [{
        LATITUDE1: 30.79797,
        LONGITUDE1: 122.30033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 30.79797,
        LONGITUDE: 122.30033,
        SOG: 22,
        TIME: "2019-12-29 09:06:54 GMT"
      }],
      [{
        LATITUDE1: 30.79797,
        LONGITUDE1: 122.30033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 30.79797,
        LONGITUDE: 122.30033,
        SOG: 20,
        TIME: "2019-12-28 09:05:54 GMT"
      }],
      [{
        LATITUDE1: 30.80797,
        LONGITUDE1: 122.20033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 30.79797,
        LONGITUDE: 122.30033,
        SOG: 40,
        TIME: "2019-12-26 09:04:54 GMT"
      }],
      [{
        LATITUDE1: 31.79797,
        LONGITUDE1: 122.50033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 31.79797,
        LONGITUDE: 122.50033,
        SOG: 50,
        TIME: "2019-12-23 09:03:54 GMT"
      }],
      [{
        LATITUDE1: 31.83797,
        LONGITUDE1: 122.53033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 31.75797,
        LONGITUDE: 122.50033,
        SOG: 10,
        TIME: "2019-12-22 09:02:54 GMT"
      }],
      [{
        LATITUDE1: 31.83797,
        LONGITUDE1: 122.54033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 31.75797,
        LONGITUDE: 122.50033,
        SOG: 35,
        TIME: "2019-12-21 09:02:54 GMT"
      }],
    ]
  });

  $("#speed-info-box").show()
  showSpeedChart();

}