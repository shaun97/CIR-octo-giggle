$(document).ready(function () {
  $("#info-close-button").click(function () {
    $("#ship-info-box").hide();
    if (!MAP_VIEW) {$("#clr-track-btn").click()};
    map.removeOverlay(THIS_SHIP_LABEL);
  });
  $("#info-edit-button").click(function () {
    $("#change-name-box").show();
  });
  $("#info-box-observe-btn").click(function () {
    $("#observe-write").show();
    $("#observe-read").hide();
    $("#observe-list-box").show()
  });
});

function showData(item) {
  // others DRAUGHT, B, C, NAVSTAT, D, SOG, HEADING, ETA, ROT, COG
  let { A, LONGITUDE, TIME, IMO, NAME, MMSI, CALLSIGN, LATITUDE, TYPE, DEST, NICKNAME } = item.data;
  $("#ship-info-box").show();
  $("#ship-info-nknm").text(NICKNAME == null ? (NAME == null ? "-" : NAME) : NICKNAME);
  $("#ship-info-name").text(NAME == null ? "-" : NAME);
  $("#ship-info-id-m").text(IMO == null ? "-" : IMO);
  $("#ship-info-length").text(A == null ? "-" : A);
  $("#ship-info-dest").text(DEST == null ? "-" : DEST);
  $("#ship-info-time").text(TIME == null ? "-" : convertDateToString(TIME));
  $("#ship-info-id-l").text(!MMSI ? "-" : MMSI);
  $("#ship-info-id-s").text(CALLSIGN == null ? "-" : CALLSIGN);
  $("#ship-info-type").text(TYPE == null ? "-" : TYPE);
  $("#ship-info-lng").text(LONGITUDE == null ? "-" : LONGITUDE);
  $("#ship-info-lat").text(LATITUDE == null ? "-" : LATITUDE);
}

layui.use('laydate', function () {
  var laydate = layui.laydate;

  laydate.render({
    elem: '#ship-date-range'
    , range: true
    , theme: '#006ce7',
  });
});