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

function showTrack() {
    
  map.clearOverlays();
  if (MAPV_LAYER != null) MAPV_LAYER.hide();
  MAP_VIEW = false;
  CLEAR_LAYER = filterShips([]);
}

function clearTrack() {
  CLEAR_LAYER.destroy();
  map.clearOverlays();
  if (TEMP_MAPV_LAYER == null) {
    MAPV_LAYER.show();
  } else {
    TEMP_MAPV_LAYER.show();
  }
  MAP_VIEW = true;
}