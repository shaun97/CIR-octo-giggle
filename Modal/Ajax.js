function mapInitAjax() {
  $(function () {
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
    $('#clr-track-btn').click(function () {
      MAP_VIEW = true;
      map.clearOverlays();
      resetView();
      let item = THIS_SHIP_ITEM;
      THIS_SHIP_ITEM = null; // Cheat
      setThisShipSel(item);
    });
  });
}

function chaInfoAjax(dateRange, id) {
  $.ajax({
    url: `http://${IP_ADDRESS}/ships/getMMSI?MmsiIorName=` + id,
    // url: 'http://localhost:3000/data',
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      // console.log(data.data, id); // Will need to change this to data.data
      try {
        // console.log(data.data);

        if (data.data == null) throw new Error('No data on this ship');

        if (!dateRange.split(" - ")[0] || !dateRange.split(" - ")[1]) {
          var history_data = data.data;
        } else {
          var startDate = new Date(dateRange.split(" - ")[0]);
          var endDate = new Date(dateRange.split(" - ")[1]);
          var history_data = data.data.filter(ship_point => new Date(ship_point.TIME) > startDate && new Date(ship_point.TIME) < endDate);
        }

        history_data = history_data.sort((x, y) => new Date(x.TIME) > new Date(y.TIME) ? 1 : -1)

        if (history_data.length == 0) {
          throw new Error('No data on this ship');
        }
        dynamicLine(history_data);
        // get_track(history_data); //开始和结束的图标
      } catch (error) {
        alert("Cannot load this ship's ship data");
        console.log(error);

        $('#clr-track-btn').click();
      }
    },
    error: function () {
      alert("Error please try again");
      $('#clr-track-btn').click();
    }
  });
}