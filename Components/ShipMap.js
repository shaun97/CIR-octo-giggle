/**
 * Initialise BMap
 */
var map = new BMap.Map("ship-map");

// create a map instance
// var point = new BMap.Point(116.404, 39.915);
var point = new BMap.Point(121.4737, 31.2304);
var convertor = new BMap.Convertor();
convertor.translate([point], 1, 5, (data) => {
  console.log(data.status);
  map.centerAndZoom(point, 11);
  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.ScaleControl());
  map.addControl(new BMap.OverviewMapControl());
  map.addControl(new BMap.MapTypeControl());  
})

// Create point coordinates   
// map.centerAndZoom(point, 11);
// map.addControl(new BMap.NavigationControl());
// map.addControl(new BMap.ScaleControl());
// map.addControl(new BMap.OverviewMapControl());
// map.addControl(new BMap.MapTypeControl());  