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
  map.centerAndZoom(point, 9);
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
  console.log(json[i]);
  let pt = new BMap.Point(json[i].lng, json[i].lat);
  convertor.translate([pt], 1, 5, (data) => {
    let ship = new BMap.Marker(pt);
    map.addOverlay(ship);
    ship.addEventListener("click", function () {
      // ship.data = json[i];
      // $(document).
      map.centerAndZoom(pt, 10);
      // document.getElementById("ship-info-box").hidden = false;
      const {name, nickname, idM, len, country, idL, idS, mass, lng, lat} = json[i];
      console.log("length", len);
      $(document).ready(function(){
        $("#ship-info-box").show();
        $("#ship-info-nknm").text(nickname);
        $("#ship-info-name").text(name);
        $("#ship-info-id-m").text(idM);
        $("#ship-info-length").text(len);
        $("#ship-info-country1").text(country);
        $("#ship-info-country2").text(country);
        $("#ship-info-id-l").text(idL);
        $("#ship-info-id-s").text(idS);
        $("#ship-info-mass").text(mass);
        $("#ship-info-lng").text(lng);
        $("#ship-info-lat").text(lat);
      });
      
    });
  })
}



