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
  map.centerAndZoom(point, 1);
  map.addControl(new BMap.ScaleControl());
  map.addControl(new BMap.OverviewMapControl());
})

// 600000
// json = getAllShips();
// arr = json.data;
/**
 * Adding a point
 */
// for (let i = 0; i < arr.length; i += 5) {
//   // const { name, nickname, idM, len, country, idL, idS, mass, lng, lat, img } = json[i];
//   const {LONGITUDE, LATITUDE} = arr[i];
//   let pt = new BMap.Point(LONGITUDE, LATITUDE);
//   convertor.translate([pt], 1, 5, (data) => {
//     let ship = new BMap.Marker(pt);
//     map.addOverlay(ship);
//     ship.addEventListener("click", function () {
//       map.centerAndZoom(pt, 5);
//       $(document).ready(function () {
//         // $("#ship-info-box").show();
//         // $("#ship-info-nknm").text(nickname);
//         // $("#ship-info-name").text(name);
//         // $("#ship-info-id-m").text(idM);
//         // $("#ship-info-length").text(len);
//         // $("#ship-info-country1").text(country);
//         // $("#ship-info-country2").text(country);
//         // $("#ship-info-id-l").text(idL);
//         // $("#ship-info-id-s").text(idS);
//         // $("#ship-info-mass").text(mass);
//         $("#ship-info-lng").text(LONGITUDE);
//         $("#ship-info-lat").text(LATITUDE);
//         // $("#ship-info-img").attr("src", img);
//       });

//     });
//   })
// }



