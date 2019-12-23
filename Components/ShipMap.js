var shipsArr = [];
var listen_status = 0;

var search_lng = 0;
var search_lat = 0;
var search_status = 0;
var zhong = 0;

$('#clr-track-btn').click(function () {
  // window.location.reload()
  map.clearOverlays();
  listen_status = 0;
  map.centerAndZoom(map.getCenter(), map.getZoom() - 1);
  map.centerAndZoom(map.getCenter(), map.getZoom() + 1);
});

$(function () {
  $.ajax({
    url: "http://192.168.0.121:8761/shipsController/getDateJson",
    // url: "http://localhost:3000/data",
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (data) {
      shipsArr = data.data; // Change back
      // 船只
      // 第一步创建mapv示例 -船只数开始
      // 数据集
      var data = [];

      for (var i = 0; i < shipsArr.length; i++) {
        data.push({
          geometry: {
            type: 'Point',
            coordinates: [shipsArr[i].LONGITUDE, shipsArr[i].LATITUDE],
            id: i,
          }
        });
      }
      var dataSet = new mapv.DataSet(data);
      
      // 点击时的监听事件

      // 实现缩放展示隐藏船
      map.addEventListener("zoomend", function (e) {
        var ZoomNum = map.getZoom();
        if (ZoomNum >= 9) {
          if (listen_status == '0') {
            mapvLayer.hide();
            for (var i = 0; i < shipsArr.length; i++) {
              //添加船标注
              var point = new BMap.Point(shipsArr[i].LONGITUDE, shipsArr[i].LATITUDE);
              if (!map.getBounds().containsPoint(point)) {
                continue;
              }
              var myIcon = new BMap.Icon("img/boat_m.png", new BMap.Size(15, 39), {
                offset: new BMap.Size(5, 5),
              });
              boats[i] = new BMap.Marker(point, { icon: myIcon });
              boats[i].data = shipsArr[i];
              boats[i].setRotation(shipsArr[i].HEADING);
              map.addOverlay(boats[i]);
              var label_dot = new BMap.Label(shipsArr[i].NAME, { offset: new BMap.Size(25, 0) });
              var style_info = {
                border: "0px solid rgba(6, 28, 44, 0.51)",
                fontFamily: "微软雅黑",
                padding: '0px 5px',

              };
              var style_info2 = {
                border: "0px solid rgba(6, 28, 44, 0.51)",
                fontFamily: "微软雅黑",
                padding: '0px 5px',
                background: 'red',
                color: '#fff'
              };
              var style_info3 = {
                border: "0px solid rgba(6, 28, 44, 0.51)",
                fontFamily: "微软雅黑",
                padding: '0px 5px',
                background: '#fff',
                color: '#000'
              };
              // STYLING FOR THE SEARCH WILL HAVE TO CHANGE THIS LATER -----START------
              if (search_lng == shipsArr[i].lng && search_lat == shipsArr[i].lat) {
                label_dot.setStyle(style_info2);
              } else {
                label_dot.setStyle(style_info);
                addMouseHandler_dot_over(boats[i], style_info2, label_dot);
                addMouseHandler_dot_out(boats[i], style_info3, label_dot);
              }
              // STYLING FOR THE SEARCH WILL HAVE TO CHANGE THIS LATER ------END-------
              boats[i].setLabel(label_dot);

              addClickHandler_dot_click(i, boats[i]);
            }
            function addClickHandler_dot_click(i, marker) {
              marker.addEventListener("click", function () {
                let { A, DRAUGHT, B, C, NAVSTAT, D, LONGITUDE, TIME, SOG, IMO, NAME, HEADING,
                  MMSI, CALLSIGN, ETA, ROT, COG, LATITUDE, TYPE, DEST } = marker.data;
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
                map.panTo(marker.getPosition(), true);
              });
            }

            function addMouseHandler_dot_over(marker, style, label_dot2) {
              marker.addEventListener("mouseover", function (e) {
                return label_dot2.setStyle(style_info2);
              });

            }
            function addMouseHandler_dot_out(marker, style, label_dot2) {
              marker.addEventListener("mouseout", function (e) {
                return label_dot2.setStyle(style_info3);
              });

            }
          }
        } else {
          // map.clearOverlays(marker_dot);//清除标注
          if (listen_status == '0') {
            if (map.getOverlays().length > 1) {
              map.clearOverlays();
            }

            mapvLayer.show();
            // 删除船图案
            // for (var i = 0; i < boats.length; i++) {
            //   map.removeOverlay(boats[i]);
            // }
          }
        }
      });

      // 搜索 SEARCH BUTTON ----------------------------------------------------------START
      // $('.se_btn').click(function () {
      //   $.ajax({
      //     url: "http://140.246.248.132:3000/vessels/" + $('.search_box2_child').val(),
      //     type: "GET",//请求方式为get
      //     dataType: "json", //返回数据格式为json
      //     success: function (data) {
      //       search_lng = data.lng;
      //       search_lat = data.lat;
      //       map.centerAndZoom(new BMap.Point(data.lng, data.lat), 9);//设置中心点和显示级别。中国。
      //     },
      //     error: function () {
      //     }
      //   });
      // });
      // 搜索 SEARCH BUTTON ------------------------------------------------------------END

      // 添加百度地图可视化叠加图层 The OVERLAY OPTIONS!!!
      var options = {
        // zIndex: 0, // 层级
        // unit:'px',
        fillStyle: '#df4c06',
        // shadowColor: 'rgba(255, 50, 50, 1)',
        // shadowBlur: 80,
        // styleType: 'stroke',
        globalCompositeOperation: 'lighter',
        // lineWidth: 0,
        methods: { // 一些事件回调函数
          click: function (item) { // 点击事件，返回对应点击元素的对象值
            // console.log(item);
            // var localtion=item.geometry.coordinates;
            // //BMap.Point(localtion)会报错，需要分开写
            // map.centerAndZoom(new BMap.Point(localtion[0],localtion[1]),5);

          }
        },
        draw: 'simple',
        size: 2,
      };

      var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
      close_load();
      // 船只数结束

      function cha_info(id) {
        $("#inq-track-btn").attr("onclick", "").unbind("click"); // clear previous onclick
        $('#inq-track-btn').click(function () {
          // map.clearOverlays(marker_dot);//清除标注
          // 删除船图案
          for (var i = 0; i < shipsArr.length; i++) {
            map.removeOverlay(boats[i]);
          }

          map.clearOverlays();

          listen_status = 1;
          $.ajax({
            url: 'http://192.168.0.121:8761/shipsController/getMMSI?MmsiIorName=' + id,
            type: "GET",//请求方式为get
            dataType: "json", //返回数据格式为json
            success: function (data) {
              // console.log(data.data.map(x => x.TIME));
              // console.log(data, id); // Will need to change this to data.data
              try {
              history_data = data.data.sort((x, y) => new Date(x.TIME).getTime() > new Date(y.TIME).getTime() ? 1 : -1);
              // console.log(history_data.map(x => x.TIME));
              dynamicLine();
              get_track(history_data); //开始和结束的图标
              } catch (error) {
                alert("Cannot load this ship's ship data");
                // console.log(error);
                $('#clr-track-btn').click();
              }
            },
            error: function () {
              $('#clr-track-btn').click();
            }
          });
        });
      }

    },
    error: function () {
      alert("Cannot load ship data");
    }
  });

  map.addEventListener("dragend", () => {
    // map.centerAndZoom(map.getCenter(), map.getZoom() - 1);
    // map.centerAndZoom(map.getCenter(), map.getZoom() + 1);
  })
})

var boats = [];
var map = new BMap.Map("ship-map"); //初始化地图
map.setMaxZoom(10);
map.centerAndZoom(new BMap.Point(106.5584370000, 29.5689960000), 4);//设置中心点和显示级别。中国。
map.enableScrollWheelZoom();//滚轮放大缩小。

// 查询轨迹
//在轨迹点上创建图标，并添加点击事件，显示轨迹点信息。points,数组。
function addMarker(points) {
  var pointsLen = points.length;
  if (pointsLen == 0) {
    return;
  }

  // 创建标注对象并添加到地图

  for (var i = 0; i < pointsLen; i++) {
    //添加标注
    var point_track0 = new BMap.Point(points[i].LONGITUDE, points[i].LATITUDE);
    // map.centerAndZoom(point_track0, 15);
    var myIcon = new BMap.Icon("img/dot.png", new BMap.Size(15, 15), {
      offset: new BMap.Size(5, 5),

    });
    var marker_track0 = new BMap.Marker(point_track0, { icon: myIcon });
    var content_track0 = "MMSI:" + points[i].MMSI + "<br>时间:" + points[i].TIME + "<br>航速:" + points[i].SOG;
    // var content_track0 ="到港时间:***离岗时间:***港口名字***";
    map.addOverlay(marker_track0);
    addClickHandler(content_track0, marker_track0);
  }
}

//添加线
function addLine(points) {
  var linePoints = [], pointsLen = points.length, i, polyline;
  if (pointsLen == 0) {
    return;
  }
  // 创建标注对象并添加到地图
  // console.log("history_data.length", history_data.length);
  for (var i = 0; i < history_data.length; i++) {
    var point = history_data[i];
    var lng = point.LONGITUDE;
    var lat = point.LATITUDE;
    linePoints.push(new BMap.Point(lng, lat));
  }
  // console.log("after loop");
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
  // console.log("before add line");
  map.addOverlay(polyline);   //增加折线
}

//轨迹点加入到轨迹中。
function dynamicLine() {
  points1 = [];
  // console.log("history data", history_data);
  var lng; var lat;
  for (var i = 0; i < history_data.length; i++) {
    var point = history_data[i];
    lng = point.LONGITUDE;
    lat = point.LATITUDE;
    var time = point.TIME;
    var markerPoints = [];
    var newLinePoints = [];
    var len;
    markerPoints.push(point);
    // console.log("in DLine before add marker");
    addMarker([point]);//增加对应该的轨迹点
    // console.log("in DLine after add marker");
    points1[i] = point;
    len = points1.length;
    newLinePoints = points1.slice(len - 2, len);//最后两个点用来画线。

    // console.log("in DLine before addline");
    addLine(newLinePoints);//增加轨迹线
    // console.log("in DLine after addline");

    // 添加标签
    var point_label = new BMap.Point(lng, lat);
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

    });
    map.addOverlay(label);
  }
  // 重新调整视野中心和缩放大小
  // console.log("Moved");
  map.centerAndZoom(new BMap.Point(lng, lat), 9);
}

//数据准备,
var points1 = [];//原始点信息数组
var bPoints = [];//百度化坐标数组。用于更新显示范围。
// var biao = '0';
// 开始和结束图片
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
function addClickHandler(content, marker){
  marker.addEventListener("mouseover",function(e){
          openInfo(content, e)
      }
  );
}
function openInfo(content, e){
  var p = e.target;
  var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
  var infoWindow = new BMap.InfoWindow(content, opts3);  // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point); //开启信息窗口
}