/**
 * Initialise BMap
 */
let mapDiv = document.getElementById("ship-map");

var map = new BMap.Map(mapDiv);

// create a map instance
// var point = new BMap.Point(116.404, 39.915);
var point = new BMap.Point(121.4737, 31.2304);
var convertor = new BMap.Convertor();
convertor.translate([point], 1, 5, (data) => {
  console.log(data.status);
  map.centerAndZoom(point, 10);
  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.ScaleControl());
  map.addControl(new BMap.OverviewMapControl());
  map.addControl(new BMap.MapTypeControl());
})

/**
 * Adding a point
 */
var json = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "http://localhost:3000/posts",
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();

for (let i = 0; i < json.length; i++) {
  let pt = new BMap.Point(json[i].lng, json[i].lat);
  convertor.translate([pt], 1, 5, (data) => {
    let ship = new BMap.Marker(pt);
    map.addOverlay(ship);
    ship.addEventListener("click", function () {
      ship.data = json[i];
      map.centerAndZoom(json.point, 10);
      if (document.getElementById("ship-info-box").hidden) {
        document.getElementById("ship-info-box").hidden = false;
      } else {
        document.getElementById("ship-info-box").hidden = true;
      }
    });
  })
}



