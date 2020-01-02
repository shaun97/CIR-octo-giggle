function mapInitAjax() {
  console.time("init AJAX");
  $.ajax({
    // url: `http://${IP_ADDRESS}/ships/getDateJson`,
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
  // $.ajax({
  //   url: `http://${IP_ADDRESS}/ships/getMMSI?MmsiIorName=` + id,
  //   // url: 'http://localhost:3000/data',
  //   type: "GET",//请求方式为get
  //   dataType: "json", //返回数据格式为json
  //   success: function (data) {
  //     console.timeEnd("Search AJAX");
  //     drawTrack(data);
  //   },
  //   error: function () {
  //     alert("Error please try again");
  //     $('#clr-track-btn').click();
  //   }
  // });

  return drawTrack({
    data: [
      [{
        LATITUDE1: 30.79797,
        LONGITUDE1: 122.30033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 30.79797,
        LONGITUDE: 122.30033,
        TIME: "2019-12-25 09:06:54 GMT"
      }],
      [{
        LATITUDE1: 30.79797,
        LONGITUDE1: 122.30033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 30.79797,
        LONGITUDE: 122.30033,
        TIME: "2019-12-25 09:07:54 GMT"
      }],
      [{
        LATITUDE1: 31.79797,
        LONGITUDE1: 122.50033,
        NAME: "SHAN SHI",
        MMSI: 412379380,
        LATITUDE: 31.79797,
        LONGITUDE: 122.50033,
        TIME: "2019-12-25 09:10:54 GMT"
      }],
    ]
  });
}