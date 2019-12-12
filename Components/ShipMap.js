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
var shipPt = new BMap.Point(122.020, 31.650);
convertor.translate([shipPt], 1, 5, (data) => {
  let shipMarker = new BMap.Marker(shipPt);

  map.addOverlay(shipMarker);

  shipMarker.addEventListener("click", function () {
    // alert("Clicked on the ship");
    map.centerAndZoom(shipPt, 10);
    if (document.getElementById("pop-up-ship-info").hidden) {
      document.getElementById("pop-up-ship-info").hidden = false;
    } else {
      document.getElementById("pop-up-ship-info").hidden = true;
    }
  });
})



