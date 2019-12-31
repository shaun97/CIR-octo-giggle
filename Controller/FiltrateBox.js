function getShipIcon(ship) {
  var typeID = ship.TYPE;
  if (70 <= typeID && typeID <= 79) {
    ship.TYPE_IDX = 0;
    if (ship.HEADING == 511) return './img/cargoships_pt.png';
    return './img/cargoships.png';
  } else if (80 <= typeID && typeID <= 89) {
    ship.TYPE_IDX = 1;
    if (ship.HEADING == 511) return './img/tankers_pt.png';
    return './img/tankers.png';
  } else if (60 <= typeID && typeID <= 69) {
    ship.TYPE_IDX = 2;
    if (ship.HEADING == 511) return './img/passenger_pt.png';
    return './img/passenger.png';
  } else if (40 <= typeID && typeID <= 49) {
    ship.TYPE_IDX = 3;
    if (ship.HEADING == 511) return './img/highspeedcrafts_pt.png';
    return './img/highspeedcrafts.png';
  } else if (36 <= typeID && typeID <= 37) {
    ship.TYPE_IDX = 4;
    if (ship.HEADING == 511) return './img/Yatchs_pt.png';
    return './img/Yachts.png';
  } else if (typeID == 30) {
    ship.TYPE_IDX = 5;
    if (ship.HEADING == 511) return './img/fishingship_pt.png';
    return './img/fishingship.png';
  } else if (typeID == 35) {
    ship.TYPE_IDX = 6;
    if (ship.HEADING == 511) return './img/military_pt.png';
    return './img/military.png';
  } else if (0 <= typeID && typeID <= 19 || 38 <= typeID && typeID <= 39) {
    ship.TYPE_IDX = 7;
    if (ship.HEADING == 511) return './img/othertype_pt.png';
    return './img/othertype.png';
  } else {
    ship.TYPE_IDX = 8;
    if (ship.HEADING == 511) return './img/unknown_pt.png';
    return './img/unknown.png';
  }
}

function setFilterProperties() {
  var ship = null;
  for (var i = 0; i < ALL_SHIPS.length; i++) {
    ship = ALL_SHIPS[i];
    var size = ship.A;
    if (!size || size < 40) {
      ship.SIZE_IDX = 0;
    } else if (size < 80) {
      ship.SIZE_IDX = 1;
    } else if (size < 120) {
      ship.SIZE_IDX = 2;
    } else if (size < 160) {
      ship.SIZE_IDX = 3;
    } else if (size < 240) {
      ship.SIZE_IDX = 4;
    } else if (size < 320) {
      ship.SIZE_IDX = 5;
    } else {
      ship.SIZE_IDX = 6;
    }
  }
}

function filterShips(arrOfShips) {
  $("#ship-info-box").hide();
  var data = [];
  TYPE_FLTR = TYPE_ARR.reduce((x, y) => x && y, true);
  SIZE_FLTR = SIZE_ARR.reduce((x, y) => x && y, true);

  let thisShip = null;
  let check = 0;
  for (var i = 0; i < arrOfShips.length; i++) {
    thisShip = arrOfShips[i];
    if (customPred(thisShip)) {
      check++;
      var img = new Image(0.1, 0.1);
      img.src = getShipIcon(thisShip);
      data.push({
        geometry: {
          type: 'Point',
          coordinates: [thisShip['LONGITUDE1'], thisShip['LATITUDE1']],
          id: i,
        },
        icon: img,
        deg: thisShip.HEADING - 90,
        data: thisShip,
      });
    }
    if (i == 0) console.log(thisShip, thisShip['LONGITUDE1'], thisShip['LATITUDE1']);
  }
  console.log("check:", check, "all:", arrOfShips.length);
  let currMapVLayer = showPoints(data);
  return currMapVLayer;
}

function showPoints(data) {
  var dataSet = new mapv.DataSet(data);
  // 添加百度地图可视化叠加图层 The OVERLAY OPTIONS!!!
  var options = {
    methods: { // 一些事件回调函数
      click: function (item) { // 点击事件，返回对应点击元素的对象值
        if (item == null) return;
        addClickHandler_dot_click(item);
      },
      mousemove: function (item) { // 点击事件，返回对应点击元素的对象值
        if (item != null) {
          map.setDefaultCursor('pointer');
        } else {
          map.setDefaultCursor('default');
        }
        setThisShipHover(item);
      }
    },
    draw: 'icon',
    width: 21, // 规定图像的宽度
    height: 10,
    size: 8,
  };

  clearMapOverlay();
  return new mapv.baiduMapLayer(map, dataSet, options);
  //MAPV_LAYER = new mapv.baiduMapLayer(map, dataSet, options);
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