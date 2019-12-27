let TYPE_ARR = Array(9).fill(true);
let TYPE_FLTR = true;
let SIZE_ARR = Array(8).fill(true);
let SIZE_FLTR = true;
let MOVE_ARR = Array(2).fill(true);

let PRED = null;

$(document).ready(function () {
  //Close Button
  $("#filtrate-close-button").click(function () {
    $("#ship-filtrate-box").hide();
  });

  //Filtrate selector
  $("#selector-all-button").click(function () {
    $(this).toggleClass("grey-button");
    if (!$(this).hasClass("grey-button")) {
      $("#selector-clear-button").addClass("grey-button");
      $(".filtrate-type-button").removeClass("grey-button");
    }
  });

  $("#selector-clear-button").click(function () {
    $(this).toggleClass("grey-button");
    if (!$(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
      $(".filtrate-type-button").addClass("grey-button");
    }
  });

  //Ship type buttons
  $("#option-type-container-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })


  $("#option-type-oil-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })


  $("#option-type-passenger-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })

  $("#option-type-fastcraft-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })

  $("#option-type-yacht-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })

  $("#option-type-fishing-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })


  $("#option-type-military-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })

  $("#option-type-others-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })

  $("#option-type-unknown-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })

  //Weight Buttons
  $("#option-size-40-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-size-80-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-size-120-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-size-160-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-size-240-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-size-320-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-size-320abv-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-size-custom").click(function () {
    $(".filtrate-set-weight-subclass").hide();
    $(".filtrate-custom-weight-subclass").show();
  })

  $("#filtrate-option-custom-close").click(function () {
    $(".filtrate-set-weight-subclass").show();
    $(".filtrate-custom-weight-subclass").hide();
  })

  //Ship status
  $("#option-status-stop-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-status-moving-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  //Ship flag
  $("#option-flag-china-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-flag-ht-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $("#option-flag-others-btn").click(function () {
    $(this).toggleClass("grey-button");
  })

  $('#filter-btn').click(function () {
    TYPE_ARR[0] = $('#option-type-container-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[1] = $('#option-type-oil-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[2] = $("#option-type-passenger-btn").hasClass("grey-button") ? false : true;
    TYPE_ARR[3] = $("#option-type-fastcraft-btn").hasClass("grey-button") ? false : true;
    TYPE_ARR[4] = $("#option-type-yacht-btn").hasClass("grey-button") ? false : true;
    TYPE_ARR[5] = $("#option-type-fishing-btn").hasClass("grey-button") ? false : true;
    TYPE_ARR[6] = $("#option-type-military-btn").hasClass("grey-button") ? false : true;
    TYPE_ARR[7] = $("#option-type-others-btn").hasClass("grey-button") ? false : true;
    TYPE_ARR[8] = $("#option-type-unknown-btn").hasClass("grey-button") ? false : true;

    SIZE_ARR[0] = $('#option-size-40-btn').hasClass("grey-button") ? false : true;
    SIZE_ARR[1] = $('#option-size-80-btn').hasClass("grey-button") ? false : true;
    SIZE_ARR[2] = $('#option-size-120-btn').hasClass("grey-button") ? false : true;
    SIZE_ARR[3] = $('#option-size-160-btn').hasClass("grey-button") ? false : true;
    SIZE_ARR[4] = $('#option-size-240-btn').hasClass("grey-button") ? false : true;
    SIZE_ARR[5] = $('#option-size-320-btn').hasClass("grey-button") ? false : true;
    SIZE_ARR[6] = $('#option-size-320abv-btn').hasClass("grey-button") ? false : true;
    SIZE_ARR[7] = $('#option-size-custom').hasClass("grey-button") ? false : true;

    MOVE_ARR[0] = $('#option-status-stop-btn').hasClass("grey-button") ? false : true;
    MOVE_ARR[1] = $('#option-status-moving-btn').hasClass("grey-button") ? false : true;

    TYPE_FLTR = TYPE_ARR.reduce((x, y) => x && y, true);
    console.log(TYPE_FLTR, TYPE_ARR);
    SIZE_FLTR = SIZE_ARR.reduce((x, y) => x && y, true);
    console.log(SIZE_FLTR, SIZE_ARR);
    filterShips();
  })
});

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

function setFilterProperties(ship) {
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

function filterShips() {
  var data = [];
  if (!ALL_SHIPS) {
    alert("Please refresh page");
    return;
  }
  let thisShip = null;
  for (var i = 0; i < ALL_SHIPS.length; i++) {
    thisShip = ALL_SHIPS[i];
    if (customPred(thisShip)) {
      var img = new Image(0.1, 0.1);
      img.src = getShipIcon(thisShip);
      setFilterProperties(thisShip);
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
  }
  // 船只
  // 第一步创建mapv示例 -船只数开始
  // 数据集
  var dataSet = new mapv.DataSet(data);
  // 添加百度地图可视化叠加图层 The OVERLAY OPTIONS!!!
  var options = {
    /*
    zIndex: 0, // 层级
    unit:'px',
    fillStyle: '#df4c06',
    shadowColor: 'rgba(255, 50, 50, 1)',
    shadowBlur: 80,
    styleType: 'stroke',
    globalCompositeOperation: 'darker',
    lineWidth: 0,
    // */
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
  };
  map.clearOverlays();
  MAPV_LAYER = new mapv.baiduMapLayer(map, dataSet, options);
  close_load();
}

function customPred(ship) {
  const typeIdx = ship.TYPE_IDX;
  const sizeIdx = ship.SIZE_IDX;
  const speed = ship.SOG;

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

  if (!MOVE_ARR[0] && speed < 0.5 || !speed) return false;
  if (!MOVE_ARR[1] && speed >= 0.5) return false;
  // switch 
  return true;
}