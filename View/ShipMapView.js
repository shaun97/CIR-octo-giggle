function showTrack() {
  map.clearOverlays();
  if (MAPV_LAYER != null) MAPV_LAYER.hide();
  MAP_VIEW = false;
  createClearLayer()
}

function clearTrack() {
  destroyClearLayer()
  map.clearOverlays();
  // if (TEMP_MAPV_LAYER == null) {
  MAPV_LAYER.show();
  // } else {
  //   TEMP_MAPV_LAYER.show();
  // }
  MAP_VIEW = true;
}

function createClearLayer() {
  CLEAR_LAYER = new mapv.baiduMapLayer(map, new mapv.DataSet([]), {});
}
function destroyClearLayer() {
  if (CLEAR_LAYER != null) CLEAR_LAYER.destroy(); CLEAR_LAYER = null;
}