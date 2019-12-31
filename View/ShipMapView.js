function showTrack() {    
  map.clearOverlays();
  if (MAPV_LAYER != null) MAPV_LAYER.hide();
  MAP_VIEW = false;
  CLEAR_LAYER = filterShips([]);
}

function clearTrack() {
  if (CLEAR_LAYER != null) CLEAR_LAYER.destroy();
  map.clearOverlays();
  if (TEMP_MAPV_LAYER == null) {
    MAPV_LAYER.show();
  } else {
    TEMP_MAPV_LAYER.show();
  }
  MAP_VIEW = true;
}