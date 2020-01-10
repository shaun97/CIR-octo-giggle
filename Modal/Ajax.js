function mapInitAjax() {
  console.time("init AJAX");
  $.ajax({
    //url: `http://${IP_ADDRESS}/ships/getDateJson`,
    url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.timeEnd("init AJAX");
      console.log('init data', data);
      ALL_SHIPS = data.data[0][0] ? data.data[0] : data.data;
      // ALL_SHIPS = data.data[0]; // Change back
      if (!ALL_SHIPS || ALL_SHIPS.length == 0) {
        alert("Please refresh page");
        return;
      }
      ShipMap.mapLayersInit();
    },
    error: function () {
      alert("Cannot load ship data");
    }
  });
}

function chaInfoAjax(id) {
  console.time("Search AJAX");
  open_load();
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/getMMSI?MmsiIorName=` + id,
    // url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.timeEnd("Search AJAX");
      console.log('before change', data.data);
      data.data = data.data.map(x => x[0] ? x[0] : x); // Backend change

      console.log('after change', data.data);
      console.log('ajax data', data.data);
      try {
        if (!data.data || data.data.length == 0) {
          close_load();
          throw new Error('No data on this ship');
        }
        ShipMap.drawTrack(data);
        $("#speed-info-box").show()
        ShipSpeedBoxView.showSpeedChart();
        close_load();
      } catch (error) {
        console.log(error);
        alert(error);
        close_load();
        ShipMapView.clearTrack();
      }
    },
    error: function () {
      throw new Error('Please try again');
    }
  });

  // ShipMap.drawTrack({
  //   data: [
  //     {
  //       LATITUDE1: 30.79797,
  //       LONGITUDE1: 122.30033,
  //       NAME: "SHAN SHI",
  //       MMSI: 412379380,
  //       LATITUDE: 30.79797,
  //       LONGITUDE: 122.30033,
  //       SOG: 22,
  //       TIME: "2019-12-22 09:06:54 GMT"
  //     },
  //     {
  //       LATITUDE1: 30.79797,
  //       LONGITUDE1: 122.30033,
  //       NAME: "SHAN SHI",
  //       MMSI: 412379380,
  //       LATITUDE: 30.79797,
  //       LONGITUDE: 122.30033,
  //       SOG: 20,
  //       TIME: "2019-12-23 09:05:54 GMT"
  //     },
  //     {
  //       LATITUDE1: 30.80797,
  //       LONGITUDE1: 122.20033,
  //       NAME: "SHAN SHI",
  //       MMSI: 412379380,
  //       LATITUDE: 30.79797,
  //       LONGITUDE: 122.30033,
  //       SOG: 40,
  //       TIME: "2019-12-24 09:04:54 GMT"
  //     },
  //     {
  //       LATITUDE1: 31.79797,
  //       LONGITUDE1: 122.50033,
  //       NAME: "SHAN SHI",
  //       MMSI: 412379380,
  //       LATITUDE: 31.79797,
  //       LONGITUDE: 122.50033,
  //       SOG: 50,
  //       TIME: "2019-12-25 09:03:54 GMT"
  //     },
  //     {
  //       LATITUDE1: 31.83797,
  //       LONGITUDE1: 122.53033,
  //       NAME: "SHAN SHI",
  //       MMSI: 412379380,
  //       LATITUDE: 31.75797,
  //       LONGITUDE: 122.50033,
  //       SOG: 10,
  //       TIME: "2019-12-26 09:02:54 GMT"
  //     },
  //     {
  //       LATITUDE1: 31.83797,
  //       LONGITUDE1: 122.54033,
  //       NAME: "SHAN SHI",
  //       MMSI: 412379380,
  //       LATITUDE: 31.75797,
  //       LONGITUDE: 122.50033,
  //       SOG: 35,
  //       TIME: "2019-12-27 09:02:54 GMT"
  //     },
  //   ]
  // });
  // $("#speed-info-box").show()
  // ShipSpeedBoxView.showSpeedChart();
  // close_load();
}

function getGuanZhuAjax() {
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/getShipAttention?userId=${USER_KEY}`,
    // url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      ObserveList.loadGuanZhu(data.data);
      console.log("guanzhu");
    },
    error: function () {
      alert("Cannot load save data");
    }
  });
}

function insertShipAttention(shipGroup, shipName, MMSI) {
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/insertShipAttention?shipGroup=${shipGroup}&shipName=${shipName}&mmsi=${MMSI}&userId=${USER_KEY}`,
    // url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.log("Ship inserted");
    },
    error: function () {
      alert("Ship not saved");
    }
  });
}

function insertGroupAttention(shipGroup) {
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/insertShipAttention?shipGroup=${shipGroup}&userId=${USER_KEY}`,
    // url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.log("Group Inserted");
    },
    error: function () {
      alert("Group not saved");
    }
  });
}


function delGroupAttention(shipGroup) {
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/delete?userId=${USER_KEY}&shipGroup=${shipGroup}`,
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.log("Group deleted");
    },
    error: function () {
    }
  });
}

function delShipAttention(shipGroup, mmsi) {
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/delete?userId=${USER_KEY}&MMSI=${mmsi}&shipGroup=${shipGroup}`,
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      console.log("Ship deleted");
    },
    error: function () {
    }
  });
}