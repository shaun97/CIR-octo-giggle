/**
 * Initialise BMap
 */
var map = new BMap.Map("ship-map");
alert("running");
// create a map instance
var point = new BMap.Point(116.404, 39.915);
// Create point coordinates   
map.centerAndZoom(point, 11);
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());  