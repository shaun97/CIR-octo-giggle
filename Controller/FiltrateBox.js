var FiltrateBox = (function () {
  /**
   * 
   * @param {*} arrShipsGeo: Array of Geometric ship objects
   */
  function filterShips(arrShipsGeo) {
    CURRENT_SHIPS = arrShipsGeo;
    console.time("Filter");
    var data = [];
    TYPE_FLTR = TYPE_ARR.reduce((x, y) => x && y, true);
    SIZE_FLTR = SIZE_ARR.reduce((x, y) => x && y, true);

    let thisShip = null;
    let check = 0;

    ShipMap.setZoomOffset();

    if (arrShipsGeo.length < 1000) {
      ZOOM_SHIP_OFFSET = 1;
    }
    for (var i = 0; i < arrShipsGeo.length; i += ZOOM_SHIP_OFFSET) {
      if (!arrShipsGeo[i].doShow) {
        continue;
      }

      thisShip = arrShipsGeo[i];
      if (customPred(thisShip.data)) {
        check++;
        data.push(thisShip);
      }
      if (i == 0) console.log(thisShip, thisShip['LONGITUDE1'], thisShip['LATITUDE1']);
    }

    if (THIS_SHIP_ITEM && THIS_SHIP_ITEM.doShow) {
      console.log('running this ship item check');
      let boo = false;
      for (var i = 0; i < data.length; i++) {
        if (data[i].MMSI == THIS_SHIP_ITEM.data.MMSI) {
          boo = true;
        }
      }
      if (!boo) data.push(THIS_SHIP_ITEM);
    }

    console.log("check:", check, "all:", arrShipsGeo.length);
    MAPV_LAYER.dataSet.set(data);
    console.timeEnd("Filter");
    return MAPV_LAYER;
  }

  function customPred(ship) {
    const typeIdx = ship.TYPE_IDX;
    const sizeIdx = ship.SIZE_IDX;
    const speed = ship.SOG;
    // console.log("type", typeIdx, "size", sizeIdx, "move", MOVE_ARR);

    if (!TYPE_FLTR) {
      switch (typeIdx) {
        case 0: if (!TYPE_ARR[0]) return false; else break;
        case 1: if (!TYPE_ARR[1]) return false; else break;
        case 2: if (!TYPE_ARR[2]) return false; else break;
        case 3: if (!TYPE_ARR[3]) return false; else break;
        case 4: if (!TYPE_ARR[4]) return false; else break;
        case 5: if (!TYPE_ARR[5]) return false; else break;
        case 6: if (!TYPE_ARR[6]) return false; else break;
        case 7: if (!TYPE_ARR[7]) return false; else break;
        case 8: if (!TYPE_ARR[8]) return false;
      }
    }
    if (!SIZE_FLTR) {
      switch (sizeIdx) {
        case 0: if (!SIZE_ARR[0]) return false; else break;
        case 1: if (!SIZE_ARR[1]) return false; else break;
        case 2: if (!SIZE_ARR[2]) return false; else break;
        case 3: if (!SIZE_ARR[3]) return false; else break;
        case 4: if (!SIZE_ARR[4]) return false; else break;
        case 5: if (!SIZE_ARR[5]) return false; else break;
        case 6: if (!SIZE_ARR[6]) return false;
      }
    }

    if (!MOVE_ARR[0] && speed < 0.5) return false;
    if (!MOVE_ARR[1] && speed >= 0.5) return false;
    // switch 
    return true;
  }
  return {
    filterShips: filterShips
  }
}());