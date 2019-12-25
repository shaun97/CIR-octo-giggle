var ALL_SHIPS = [];
var MAPV_LAYER;
var BOAT_MARKERS = [];
var MAP_VIEW = true;
var THIS_SHIP_ITEM = null;
var THIS_SHIP_ITEM_HOVER = null;
var THIS_SHIP_LABEL = null;
var THIS_SHIP_LABEL_HOVER = null;

function setThisShipSel(item) {
  if (THIS_SHIP_ITEM == item) return;
  if (THIS_SHIP_ITEM != item) map.removeOverlay(THIS_SHIP_LABEL);

  var point = new BMap.Point(item.data.LONGITUDE, item.data.LATITUDE);
  var label_dot = new BMap.Label(item.data.NAME, { offset: new BMap.Size(20, -7) });
  label_dot.setStyle(style_this_ship_label);
  var blank = new BMap.Icon("img/boat_m.png", new BMap.Size(0, 0), {});
  var marker = new BMap.Marker(point, { icon: blank });
  marker.setLabel(label_dot);
  map.addOverlay(marker);
  THIS_SHIP_LABEL = marker;
  THIS_SHIP_ITEM = item;
}

function setThisShipHover(item) {
  if (item == null) {
    if (THIS_SHIP_LABEL_HOVER != null) map.removeOverlay(THIS_SHIP_LABEL_HOVER);
    return;
  } else if (THIS_SHIP_ITEM_HOVER != item) {
    map.removeOverlay(THIS_SHIP_LABEL_HOVER);
  } else { //item == THIS_SHIP_LABEL_ITEM
    return;
  }

  var point = new BMap.Point(item.data.LONGITUDE, item.data.LATITUDE);
  var label_dot = new BMap.Label(item.data.NAME, { offset: new BMap.Size(20, -7) });
  label_dot.setStyle(style_this_ship_label_hover);
  var blank = new BMap.Icon("img/boat_m.png", new BMap.Size(0, 0), {});
  var marker = new BMap.Marker(point, { icon: blank });
  marker.setLabel(label_dot);
  map.addOverlay(marker);
  THIS_SHIP_LABEL_HOVER = marker;
  THIS_SHIP_ITEM_HOVER = item;
}

function mapLayersInit() {
  filterShips(true);
  // close_load();
  addFunctionality();
}

function resetView() {
  MAPV_LAYER.show();
}

function addFunctionality() {
}

// function drawBoatMarker(boatMarker, data, boo) {
//   boatMarker.data = data;
//   boatMarker.setRotation(data.HEADING);
//   map.addOverlay(boatMarker);

//   var label_dot = new BMap.Label(data.NAME, { offset: new BMap.Size(25, 0) });
//   var style_info = {
//     border: "0px solid rgba(6, 28, 44, 0.51)",
//     fontFamily: "微软雅黑",
//     padding: '0px 5px',
//   };
var style_this_ship_label = {
  border: "0px solid rgba(6, 28, 44, 0.51)",
  fontFamily: "微软雅黑",
  padding: '0px 5px',
  background: 'red',
  color: '#fff',
};

var style_this_ship_label_hover = {
  border: "0px solid rgba(6, 28, 44, 0.51)",
  fontFamily: "微软雅黑",
  padding: '0px 5px',
  background: 'white',
  color: '#000',
};
//   var style_info3 = {
//     border: "0px solid rgba(6, 28, 44, 0.51)",
//     fontFamily: "微软雅黑",
//     padding: '0px 5px',
//     background: '#fff',
//     color: '#000',
//   };
//   // STYLING FOR THE SEARCH WILL HAVE TO CHANGE THIS LATER -----START------
//   if (boo) {
//     label_dot.setStyle(style_info2);
//     boatMarker.setTop(true);
//   } else {
//     label_dot.setStyle(style_info);
//     addMouseHandler_dot_over(boatMarker, style_info3, label_dot);
//     addMouseHandler_dot_out(boatMarker, style_info, label_dot);
//   }
//   // STYLING FOR THE SEARCH WILL HAVE TO CHANGE THIS LATER ------END-------
//   boatMarker.setLabel(label_dot);

//   addClickHandler_dot_click(boatMarker);

function addClickHandler_dot_click(item) {
  map.panTo(new BMap.Point(item.data.LONGITUDE, item.data.LATITUDE), true);
  setThisShipSel(item)
  showData(item);
}

// function addMouseHandler_dot_over(marker, style, label_dot2) {
//   marker.addEventListener("mouseover", function (e) {
//     return label_dot2.setStyle(style_info2);
//   });
// }
// function addMouseHandler_dot_out(marker, style, label_dot2) {
//   marker.addEventListener("mouseout", function (e) {
//     return label_dot2.setStyle(style_info3);
//   });
// }

function showData(item) {
  // others DRAUGHT, B, C, NAVSTAT, D, SOG, HEADING, ETA, ROT, COG
  let { A, LONGITUDE, TIME, IMO, NAME, MMSI, CALLSIGN, LATITUDE, TYPE, DEST } = item.data;
  $("#ship-info-box").show();
  $("#ship-info-nknm").text(NAME == null ? "-" : NAME);
  $("#ship-info-name").text(NAME == null ? "-" : NAME);
  $("#ship-info-id-m").text(IMO == null ? "-" : IMO);
  $("#ship-info-length").text(A == null ? "-" : A);
  $("#ship-info-dest").text(DEST == null ? "-" : DEST);
  $("#ship-info-time").text(TIME == null ? "-" : TIME);
  $("#ship-info-id-l").text(MMSI == null ? "-" : MMSI);
  $("#ship-info-id-s").text(CALLSIGN == null ? "-" : CALLSIGN);
  $("#ship-info-type").text(TYPE == null ? "-" : TYPE);
  $("#ship-info-lng").text(LONGITUDE == null ? "-" : LONGITUDE);
  $("#ship-info-lat").text(LATITUDE == null ? "-" : LATITUDE);
  cha_info(MMSI);
}

// function showShipsInView() {
//   let boatCount = 0;
//   for (var i = 0; i < ALL_SHIPS.length; i++) {
//     //添加船标注
//     var point = new BMap.Point(ALL_SHIPS[i].LONGITUDE, ALL_SHIPS[i].LATITUDE);
//     if (!map.getBounds().containsPoint(point) || !ALL_SHIPS[i].show) {
//       continue;
//     }
//     if (boatCount > 100) { // TEMPORARY SOLUTION!!!
//       // console.log('100 maxed');
//       return;
//     } 
//     var myIcon = new BMap.Icon("img/boat_m.png", new BMap.Size(15, 39), {
//       offset: new BMap.Size(5, 5),
//     });
//     drawBoatMarker(new BMap.Marker(point, { icon: myIcon }), ALL_SHIPS[i], false);
//     boatCount++;
//   }
// }

function cha_info(id) {
  $("#inq-track-btn").attr("onclick", "").unbind("click"); // clear previous onclick
  $('#inq-track-btn').click(function () {
    map.clearOverlays();
    MAP_VIEW = false;
    $.ajax({
      url: `http://${IP_ADDRESS}/shipsController/getMMSI?MmsiIorName=` + id,
      // url: 'http://localhost:3000/data',
      type: "GET",//请求方式为get
      dataType: "json", //返回数据格式为json
      success: function (data) {
        // console.log(data.data, id); // Will need to change this to data.data
        try {
          //   var history_data = [
          //     { MMSI: 565731000, TIME: "2019-12-20 08:28:04 GMT", LONGITUDE: 131.2823, LATITUDE: 28.84995 },
          //     { MMSI: 565731000, TIME: "2019-12-20 08:29:04 GMT", LONGITUDE: 130.7823, LATITUDE: 28.44995 },
          //     { MMSI: 565731000, TIME: "2019-12-20 08:25:04 GMT", LONGITUDE: 132.7823, LATITUDE: 28.94995 },
          //     { MMSI: 565731000, TIME: "2019-12-20 08:26:04 GMT", LONGITUDE: 132.2823, LATITUDE: 29.54995 },
          //     { MMSI: 565731000, TIME: "2019-12-20 08:27:04 GMT", LONGITUDE: 131.7823, LATITUDE: 29.44995 },
          //   ]
          history_data = data.data.sort((x, y) => new Date(x.TIME) > new Date(y.TIME) ? 1 : -1)
          history_data = history_data.slice(Math.max(history_data.length - 15, 0)); // Slice first 

          if (history_data.length == 0) {
            throw new Error('No data on this ship')
          }
          // history_data = history_data.sort((x, y) => new Date(x.TIME) > new Date(y.TIME) ? 1 : -1);
          dynamicLine(history_data);
          get_track(history_data); //开始和结束的图标
        } catch (error) {
          alert("Cannot load this ship's ship data");
          console.log(error);

          $('#clr-track-btn').click();
        }
      },
      error: function () {
        $('#clr-track-btn').click();
      }
    });
  });
}

// 查询轨迹
//在轨迹点上创建图标，并添加点击事件，显示轨迹点信息。points,数组。
function addMarker(point) {
  //添加标注
  var point_track0 = new BMap.Point(point.LONGITUDE, point.LATITUDE);
  // map.centerAndZoom(point_track0, 15);
  var myIcon = new BMap.Icon("img/dot.png", new BMap.Size(15, 15), {
    offset: new BMap.Size(5, 5),
  });
  var marker_track0 = new BMap.Marker(point_track0, { icon: myIcon });
  var content_track0 = "MMSI:" + point.MMSI + "<br>时间:" + point.TIME + "<br>航速:" + point.SOG;
  // var content_track0 ="到港时间:***离岗时间:***港口名字***";

  // 添加标签
  var time = point.TIME;
  var point_label = new BMap.Point(point.LONGITUDE, point.LATITUDE);
  var opts = {
    position: point_label,    // 指定文本标注所在的地理位置
    offset: new BMap.Size(20, -10)    //设置文本偏移量
  };
  var label = new BMap.Label(time, opts);  // 创建文本标注对象
  label.setStyle({
    color: "#fff",
    fontSize: "16px",
    height: "20px",
    lineHeight: "20px",
    border: "0px solid rgba(6, 28, 44, 0.51)",
    background: "rgba(6, 28, 44, 0.51)",
    fontFamily: "微软雅黑",
    padding: '5px',
    visibility: 'hidden'
  });

  map.addOverlay(label);

  marker_track0.addEventListener('mouseover', () => {
    label.setStyle({
      visibility: 'visible'
    })
  });
  marker_track0.addEventListener('mouseout', () => {
    label.setStyle({
      visibility: 'hidden'
    })
  });

  map.addOverlay(marker_track0);
  addClickHandler(content_track0, marker_track0);
}

//添加线
function addLine(history_data) {
  // 创建标注对象并添加到地图
  if (history_data.length < 2) return;
  var linePoints = [];
  for (var i = 0; i < history_data.length; i++) {
    var point = history_data[i];
    var lng = point.LONGITUDE;
    var lat = point.LATITUDE;
    linePoints.push(new BMap.Point(lng, lat));
  }
  var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
    scale: 0.3,//图标缩放大小
    strokeColor: '#fff',//设置矢量图标的线填充颜色
    strokeWeight: '1',//设置线宽
  });
  var icons = new BMap.IconSequence(sy, '10', '30');
  var polyline = new BMap.Polyline(linePoints, {
    enableEditing: false,//是否启用线编辑，默认为false
    enableClicking: true,//是否响应点击事件，默认为true
    icons: [icons],
    strokeColor: "#e3682d",
    strokeWeight: 2,
    strokeOpacity: 0.5,
  });
  map.addOverlay(polyline);   //增加折线
}

//轨迹点加入到轨迹中。
function dynamicLine(history_data) {
  var lng; var lat;
  addLine(history_data);//增加轨迹线
  for (var i = 0; i < history_data.length; i++) {
    var point = history_data[i];
    lng = point.LONGITUDE;
    lat = point.LATITUDE;
    addMarker(point);//增加对应该的轨迹点
  }
  // 重新调整视野中心和缩放大小
  map.centerAndZoom(new BMap.Point(lng, lat), 9);
}

// 开始和结束图片 FOR START AND END MARKERS
function get_track(history_data) {
  // console.log("get_track");
  // 开始标签
  var point_label = new BMap.Point(history_data[0].LONGITUDE, history_data[0].LATITUDE);
  // console.log("start point", history_data[0].TIME);
  var opts = {
    position: point_label,    // 指定文本标注所在的地理位置
    offset: new BMap.Size(-13, -45)    //设置文本偏移量
  };
  var label1 = new BMap.Label('', opts);  // 创建文本标注对象
  label1.setStyle({
    height: "50px",
    lineHeight: "50px",
    width: '30px',
    border: "none",
    background: "url('img/start2.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
  });
  // console.log("added start overlay");
  map.addOverlay(label1);

  // 结束标签
  var point_label = new BMap.Point(history_data[history_data.length - 1].LONGITUDE, history_data[history_data.length - 1].LATITUDE);
  // console.log("end point", history_data[history_data.length - 1].TIME);
  var opts = {
    position: point_label,    // 指定文本标注所在的地理位置
    offset: new BMap.Size(-14, -47)    //设置文本偏移量
  };
  var label2 = new BMap.Label('', opts);  // 创建文本标注对象
  if (history_data[history_data.length - 1].arrival_dest_port == false) { // If have not arrived
    label2.setStyle({
      height: "50px",
      lineHeight: "50px",
      width: '30px',
      border: "none",
      background: "url('img/stop2.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% auto",
    });
    // console.log("added end overlay");
    map.addOverlay(label2);
  } else {
    label2.setStyle({
      height: "50px",
      lineHeight: "50px",
      width: '30px',
      border: "none",
      background: "url('img/stop1.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% auto",
    });
    // console.log("added end overlay");
    map.addOverlay(label2);
  }
}

// 鼠标指上显示
var opts3 = {
  width: 200,     // 信息窗口宽度
  height: 95,     // 信息窗口高度
  title: "船运信息", // 信息窗口标题
  enableMessage: true//设置允许信息窗发送短息
};
function addClickHandler(content, marker) {
  marker.addEventListener("mouseover", function (e) {
    openInfo(content, e)
  });
}
function openInfo(content, e) {
  var p = e.target;
  var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
  var infoWindow = new BMap.InfoWindow(content, opts3);  // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point); //开启信息窗口
}

$(function () {
  $.ajax({
    url: `http://${IP_ADDRESS}/shipsController/getDateJson`,
    // url: "http://localhost:3000/data",
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      ALL_SHIPS = data.data; // Change back
      // ALL_SHIPS = data;
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
    setThisShip(item);
  });
});

var map = new BMap.Map("ship-map"); //初始化地图
// map.setMaxZoom(10);
map.centerAndZoom(new BMap.Point(106.5584370000, 29.5689960000), 4);//设置中心点和显示级别。中国。
map.enableScrollWheelZoom();//滚轮放大缩小。
