function setThisShipSel(item) {
  console.log('this item', item);

  if (THIS_SHIP_ITEM == item) return;
  if (!item || THIS_SHIP_ITEM != item) map.removeOverlay(THIS_SHIP_LABEL);

  var style_this_ship_label = {
    border: "0px solid rgba(6, 28, 44, 0.51)",
    fontFamily: "微软雅黑",
    padding: '0px 5px',
    background: 'red',
    color: '#fff',
    //Test opacity: "0.8"
  };

  THIS_SHIP_ITEM = item;

  if (!item) return;

  var point = new BMap.Point(item.data['LONGITUDE1'], item.data['LATITUDE1']);
  var label_dot = new BMap.Label(item.data.NAME, { offset: new BMap.Size(34, 7) });
  label_dot.setStyle(style_this_ship_label);
  var square = new BMap.Icon('./img/square_focus.png', {}, {});
  square.imageSize = new BMap.Size(30, 30);
  square.anchor = new BMap.Size(15, 15);
  var marker = new BMap.Marker(point, { icon: square });
  marker.setLabel(label_dot);
  map.addOverlay(marker);
  THIS_SHIP_LABEL = marker;
  console.log('lat', item.data.LATITUDE1);
  console.log('lng', item.data.LONGITUDE1);
}

function setThisShipHover(item) {
  if (item == null) {
    if (THIS_SHIP_LABEL_HOVER != null) map.removeOverlay(THIS_SHIP_LABEL_HOVER);
    THIS_SHIP_ITEM_HOVER = null;
    return;
  } else if (THIS_SHIP_ITEM == item) {
    return;
  } else if (THIS_SHIP_ITEM_HOVER != item) {
    map.removeOverlay(THIS_SHIP_LABEL_HOVER);
  } else { //item == THIS_SHIP_ITEM_HOVER
    return;
  }

  var style_this_ship_label_hover = {
    border: "0px solid rgba(6, 28, 44, 0.51)",
    fontFamily: "微软雅黑",
    padding: '0px 5px',
    background: 'white',
    color: '#000',
  };

  var point = new BMap.Point(item.data['LONGITUDE1'], item.data['LATITUDE1']);
  var label_dot = new BMap.Label(item.data.NAME, { offset: new BMap.Size(20, -7) });
  label_dot.setStyle(style_this_ship_label_hover);
  var blank = new BMap.Icon("img/square_focus.png", new BMap.Size(0, 0), {});
  var marker = new BMap.Marker(point, { icon: blank });
  marker.setLabel(label_dot);
  map.addOverlay(marker);
  THIS_SHIP_LABEL_HOVER = marker;
  THIS_SHIP_ITEM_HOVER = item;
}

const movingIcons = [
  './img/cargoships.png', './img/tankers.png', './img/passenger.png',
  './img/highspeedcrafts.png', './img/Yachts.png', './img/fishingship.png',
  './img/military.png', './img/othertype.png', './img/unknown.png'
];
const stationaryIcons = [
  './img/cargoships_pt.png', './img/tankers_pt.png', './img/passenger_pt.png',
  './img/highspeedcrafts_pt.png', './img/Yachts_pt.png', './img/fishingship_pt.png',
  './img/military_pt.png', './img/othertype_pt.png', './img/unknown_pt.png'
];
function getShipIcon(ship) {
  if (ship.HEADING == 511) return stationaryIcons[ship.TYPE_IDX];
  return movingIcons[ship.TYPE_IDX];
}

function setFilterProperties() {
  var ship = null;
  for (var i = 0; i < ALL_SHIPS.length; i++) {
    ship = ALL_SHIPS[i];
    var size = ship.A;
    if (!size || size < 40) {
      ship.SIZE_IDX = 0;
    } else if (size < 80) {
      ship.SIZE_IDX = 1;
    } else if (size < 120) {
      ship.SIZE_IDX = 2;
    } else if (size < 160) {
      ship.SIZE_IDX = 3;
    } else if (size < 240) {
      ship.SIZE_IDX = 4;
    } else if (size < 320) {
      ship.SIZE_IDX = 5;
    } else {
      ship.SIZE_IDX = 6;
    }
    var typeID = ship.TYPE;
    if (70 <= typeID && typeID <= 79) {
      ship.TYPE_IDX = 0;
    } else if (80 <= typeID && typeID <= 89) {
      ship.TYPE_IDX = 1;
    } else if (60 <= typeID && typeID <= 69) {
      ship.TYPE_IDX = 2;
    } else if (40 <= typeID && typeID <= 49) {
      ship.TYPE_IDX = 3;
    } else if (36 <= typeID && typeID <= 37) {
      ship.TYPE_IDX = 4;
    } else if (typeID == 30) {
      ship.TYPE_IDX = 5;
    } else if (typeID == 35) {
      ship.TYPE_IDX = 6;
    } else if (0 <= typeID && typeID <= 19 || 38 <= typeID && typeID <= 39) {
      ship.TYPE_IDX = 7;
    } else {
      ship.TYPE_IDX = 8;
    }
  }
}

function setGeoItems() {
  let thisShip = null;
  for (var i = 0; i < ALL_SHIPS.length; i++) {
    thisShip = ALL_SHIPS[i];
    var img = new Image(0.1, 0.1);
    img.src = getShipIcon(thisShip);
    ALL_SHIPS[i] = {
      geometry: {
        type: 'Point',
        coordinates: [thisShip['LONGITUDE1'], thisShip['LATITUDE1']],
        id: i,
      },
      doShow: true,
      icon: img,
      deg: thisShip.HEADING - 90,
      data: thisShip,
    }
  }
}

function mapLayersInit() {
  console.time('init');
  setFilterProperties();
  setGeoItems();
  MAPV_LAYER = initPoints(ALL_SHIPS);
  getGuanZhuAjax();
  close_load();
  console.timeEnd('init');
}

function addClickHandler_dot_click(item) {
  // item has item.data that contains data
  map.panTo(new BMap.Point(item.data.LONGITUDE1, item.data.LATITUDE1), true);
  setThisShipSel(item);
  showData(item.data);
  setUpTrack(item);
}

function setUpTrack(item) {
  $("#inq-track-btn").attr("onclick", "").unbind("click"); // clear previous onclick
  $('#inq-track-btn').click(function () {
    showTrack();
    showData(item.data);
    chaInfoAjax(item.data.MMSI);
  });

  $('#clr-track-btn').click(function () {
    clearTrack();
    $('#speed-info-box').hide();
    let item = THIS_SHIP_ITEM;
    THIS_SHIP_ITEM = null; // Cheat
    setThisShipSel(item);
  });
}

function drawTrack(data) {
  try {

    if (data.data == null) throw new Error('No data on this ship');

    var dateRange = $('#ship-date-range').val();
    $('#ship-date-range').val("");

    if (!dateRange.split(" - ")[0] || !dateRange.split(" - ")[1]) {
      var history_data = data.data;
    } else {
      var startDate = new Date(dateRange.split(" - ")[0]);
      var endDate = new Date(dateRange.split(" - ")[1]);
      var history_data = data.data.filter(ship_point => new Date(ship_point.TIME) > startDate && new Date(ship_point.TIME) < endDate);
    }

    history_data = history_data.sort((x, y) => new Date(x.TIME) > new Date(y.TIME) ? 1 : -1)
    let last = history_data[history_data.length - 1];
    if (map.getZoom() < 11) map.setZoom(11);
    map.centerAndZoom(new BMap.Point(last.LONGITUDE1, last.LATITUDE1), map.getZoom());
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
}

//轨迹点加入到轨迹中。
function dynamicLine(history_data) {
  //添加线
  function addLine(history_data) {
    // 创建标注对象并添加到地图
    history_data = history_data.reverse();
    if (history_data.length < 2) return;
    var linePoints = [];
    for (var i = 0; i < history_data.length; i++) {
      var point = history_data[i];
      var lng = point['LONGITUDE1'];
      var lat = point['LATITUDE1'];
      linePoints.push(new BMap.Point(lng, lat));
      if (i >= 1 && i < history_data.length) {
        if (linePoints[i - 1].lng == linePoints[i].lng && linePoints[i - 1].lat == linePoints[i].lat) continue;
        var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
          scale: 0.35,//图标缩放大小
          strokeColor: '#e3682d',//设置矢量图标的线填充颜色
          strokeWeight: '2',//设置线宽
        });
        var icons = new BMap.IconSequence(sy, '50', '50%', false);
        var polyline = new BMap.Polyline(linePoints.slice(i - 1), {
          enableEditing: false,//是否启用线编辑，默认为false
          enableClicking: true,//是否响应点击事件，默认为true
          icons: [icons],
          strokeColor: "#e3682d",
          strokeWeight: 1,
          strokeOpacity: 0.5,
        });
        map.addOverlay(polyline);   //增加折线
      }
    }
  }
  function addTrackPoints(history_data) {
    console.log('hisdata in add track points', history_data)
    // 查询轨迹
    //在轨迹点上创建图标，并添加点击事件，显示轨迹点信息。points,数组。
    function addMarker(point) {
      //添加标注
      var point_track0 = new BMap.Point(point['LONGITUDE1'], point['LATITUDE1']);
      var myIcon = new BMap.Icon("img/dot.png", new BMap.Size(15, 15), {
        offset: new BMap.Size(0, 0),
      });
      var marker_track0 = new BMap.Marker(point_track0, { icon: myIcon });
      marker_track0.setTop(true);
      var content_track0 = "MMSI: " + point.MMSI + "<br>时间: " + convertDateToString(point.TIME) + "<br>航速: " + point.SOG;
      // var content_track0 ="到港时间:***离岗时间:***港口名字***";

      // 添加标签
      var time = convertDateToString(point.TIME);
      //HERE
      var point_label = new BMap.Point(point['LONGITUDE1'], point['LATITUDE1']);
      var opts = {
        position: point_label,    // 指定文本标注所在的地理位置
        offset: new BMap.Size(10, -30)    //设置文本偏移量
      };
      var label = new BMap.Label(time, opts);  // 创建文本标注对象
      label.setStyle({
        color: "#000",
        fontSize: "10px",
        height: "10px",
        lineHeight: "10px",
        border: "1px solid rgba(6, 28, 44, 0.51)",
        background: "rgba(255, 255, 255, 0.60)",
        fontFamily: "微软雅黑",
        padding: '5px',
        // visibility: 'hidden',
      });

      label.addEventListener('mouseover', () => {
        label.setStyle({
          visibility: 'hidden'
        })
      });
      label.addEventListener('mouseout', () => {
        label.setStyle({
          visibility: 'visible'
        })
      });

      map.addOverlay(label);

      map.addOverlay(marker_track0);

      marker_track0.addEventListener("click", function (e) {
        openInfo(content_track0, e)
      });
      TRACK_MARKERS.push(marker_track0);
    }

    let data = [];
    for (var i = 0; i < TRACK_MARKERS.length; i++) {
      map.removeOverlay(TRACK_MARKERS[i]);
    }
    let last = null;
    for (var i = history_data.length - 1; i >= 0; i--) {
      var point = history_data[i];
      if (i == history_data.length - 1
        || farEnough(history_data[i], last)) {
        last = history_data[i];
        addMarker(point);//增加对应该的轨迹点
        data.push(point);
      }
    }
    // 重新调整视野中心和缩放大小
    return data;
  }

  let dLatMin = [null, null, null, null, 3, 1, 0.7, 0.5, 0.2, 0.07, 0.04, 0.02, 0.010, 0.007, 0.004, 0.002, 0.001, 0.0007, 0.0004, 0.0002]
  let dLongMin = [null, null, null, null, 6, 3, 1.5, 1.0, 0.7, 0.45, 0.25, 0.10, 0.075, 0.05, 0.03, 0.02, 0.01, 0.008, 0.004, 0.002]

  function farEnough(data1, data2) {
    let lng1 = data1.LONGITUDE1; let lng2 = data2.LONGITUDE1;
    let lat1 = data1.LATITUDE1; let lat2 = data2.LATITUDE1;
    let dLong = lng1 - lng2 < 0 ? lng2 - lng1 : lng1 - lng2;
    let dLat = lat1 - lat2 < 0 ? lat2 - lat1 : lat1 - lat2;
    if (dLat > dLatMin[map.getZoom()] || dLong > dLongMin[map.getZoom()]) {
      return true;
    }
    return false;
  }

  HISTORY_DATA = history_data;
  console.log(HISTORY_DATA);

  let pointsFarEnough = addTrackPoints(HISTORY_DATA);
  addLine(pointsFarEnough);//增加轨迹线
}

// 开始和结束图片 FOR START AND END MARKERS
function get_track(history_data) {
  // console.log("get_track");
  // 开始标签
  var point_label = new BMap.Point(history_data[0]['LONGITUDE1'], history_data[0]['LATITUDE1']);
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
  var point_label = new BMap.Point(history_data[history_data.length - 1]['LONGITUDE1'], history_data[history_data.length - 1]['LATITUDE1']);
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

function openInfo(content, e) {
  // 鼠标指上显示
  var opts3 = {
    width: 200,     // 信息窗口宽度
    height: 95,     // 信息窗口高度
    title: "船运信息", // 信息窗口标题
    enableMessage: true//设置允许信息窗发送短息
  };
  var p = e.target;
  var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
  var infoWindow = new BMap.InfoWindow(content, opts3);  // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point); //开启信息窗口
}
function convertDateToString(date) {
  return new Date(date).toLocaleString('en-GB', { timeZoneName: 'short' }).replace(/\//g, '-');
}

mapInitAjax();
var map = new BMap.Map("ship-map", {enableMapClick: false}); //初始化地图
// map.setMaxZoom(10);
map.centerAndZoom(new BMap.Point(106.5584370000, 29.5689960000), 4);//设置中心点和显示级别。中国。
map.enableScrollWheelZoom();//滚轮放大缩小。

/* 
------------------------------------
        MAP ZOOM LEAFTLET
------------------------------------
*/
(function () {
  //添加地图类型控件-卫星地图
  var mapTypeOps = {
    mapTypes: [
      BMAP_HYBRID_MAP,
      BMAP_NORMAL_MAP
    ],
    offset: new BMap.Size(50, 120)
  }

  var MapType = new BMap.MapTypeControl(
    mapTypeOps
  );

  map.addControl(MapType);
  // map.setMapType(BMAP_SATELLITE_MAP);

  // 自定义控件---放大缩小
  function ZoomControl() {
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(10, 10);
  }
  ZoomControl.prototype = new BMap.Control();
  ZoomControl.prototype.initialize = function (map) {

    // 创建一个DOM元素
    var div_ss_box = document.createElement("div");
    div_ss_box.classList.add("leaflet-control-zoom");
    var div_scale = document.createElement("a");
    var div_suo = document.createElement("a");
    div_scale.classList.add("scale_aa");
    div_scale.classList.add("suo_aa");
    div_ss_box.appendChild(div_scale);
    div_ss_box.appendChild(div_suo);


    // 添加文字说明
    div_scale.appendChild(document.createTextNode("+"));
    div_suo.appendChild(document.createTextNode("-"));
    // 绑定事件,点击一次放大两级
    div_scale.onclick = function (e) {
      map.setZoom(map.getZoom() + 1);
    }
    div_suo.onclick = function (e) {
      map.setZoom(map.getZoom() - 1);
    }
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div_ss_box);
    // 将DOM元素返回
    return div_ss_box
  }
  var myZoomCtrl = new ZoomControl();
  map.addControl(myZoomCtrl);
}())

map.addEventListener("zoomend", function (e) {
  if (!MAP_VIEW) {
    map.clearOverlays();
    console.log('zoomed with TRACK')
    dynamicLine(HISTORY_DATA);
  } else if (map.getZoom() < 9) {
    filterShips(CURRENT_SHIPS);
  } else if (map.getZoom() >= 9) {
    if (ZOOM_SHIP_OFFSET == 1) return;
    filterShips(CURRENT_SHIPS);
  }
  console.log('zoom', map.getZoom());
})

function setZoomOffset() {
  if (map.getZoom() < 9) {
    ZOOM_SHIP_OFFSET = 20 - map.getZoom() * 2;
  } else {
    ZOOM_SHIP_OFFSET = 1;
  }
}