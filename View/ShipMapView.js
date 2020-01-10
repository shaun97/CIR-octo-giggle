var ShipMapView = (function () {
  function showTrack() {
    MAP.clearOverlays();
    if (MAPV_LAYER != null) MAPV_LAYER.hide();
    MAP_VIEW = false;
    createClearLayer();
  }

  function clearTrack() {
    destroyClearLayer()
    MAP.clearOverlays();
    if ((MAP.getZoom() >= 9 && ZOOM_SHIP_OFFSET != 1) || (MAP.getZoom() < 9 && ZOOM_SHIP_OFFSET == 1)) FiltrateBox.filterShips(CURRENT_SHIPS);
    MAPV_LAYER.show();
    MAP_VIEW = true;
  }

  function createClearLayer() {
    CLEAR_LAYER = new mapv.baiduMapLayer(MAP, new mapv.DataSet([]), {});
  }
  function destroyClearLayer() {
    if (CLEAR_LAYER != null) CLEAR_LAYER.destroy(); CLEAR_LAYER = null;
  }
  return {
    showTrack: showTrack,
    clearTrack: clearTrack
  }
}());