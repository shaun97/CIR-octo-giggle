mapInitAjax();
map = new BMap.Map("ship-map", { enableMapClick: false }); //初始化地图
// map = map;
// map.setMaxZoom(10);
map.centerAndZoom(new BMap.Point(106.5584370000, 29.5689960000), 4);//设置中心点和显示级别。中国。
map.enableScrollWheelZoom();//滚轮放大缩小。

map.addEventListener("zoomend", function (e) {
  if (!MAP_VIEW) {
    map.clearOverlays();
    console.log('zoomed with TRACK')
    ShipMap.dynamicLine(HISTORY_DATA);
  } else if (map.getZoom() < 9) {
    FiltrateBox.filterShips(CURRENT_SHIPS);
  } else if (map.getZoom() >= 9) {
    if (ZOOM_SHIP_OFFSET == 1) return;
    FiltrateBox.filterShips(CURRENT_SHIPS);
  }
  console.log('zoom', map.getZoom());
});

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
}());