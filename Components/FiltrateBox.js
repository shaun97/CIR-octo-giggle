let TYPE_ARR = Array(9).fill(true);

let SIZE_40 = true;
let SIZE_80 = true;
let SIZE_120 = true;
let SIZE_160 = true;
let SIZE_240 = true;
let SIZE_360 = true;
let SIZE_360_ABV = true;
let SIZE_CUSTOM = false;

let MOVING = true;
let STOPPED = true;

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
    let boo = TYPE_ARR.reduce((x, y) => x && y, true);
    console.log(boo, TYPE_ARR);
    filterShips(boo);
  })
});

function getShipIcon(typeID) {
  if (70 <= typeID && typeID <= 79) {
    return './img/cargoships.png';
  } else if (80 <= typeID && typeID <= 89) {
    return './img/tankers.png';
  } else if (60 <= typeID && typeID <= 69) {
    return './img/passenger.png';
  } else if (40 <= typeID && typeID <= 49) {
    return './img/highspeedcrafts.png';
  } else if (36 <= typeID && typeID <= 37) {
    return './img/Yachts.png';
  } else if (typeID == 30) {
    return './img/fishingship.png';
  } else if (typeID == 35) {
    return './img/military.png';
  } else if (0 <= typeID && typeID <= 19 || 38 <= typeID && typeID <= 39) {
    return './img/unknown.png';
  } else {
    return './img/othertype.png';
  }
}

function filterShips(boo) {
  var data = [];

  if (boo) { // No filter
    for (var i = 0; i < ALL_SHIPS.length; i++) {
      var img = new Image(0.1, 0.05);
      img.src = getShipIcon(ALL_SHIPS[i].TYPE);
      data.push({
        geometry: {
          type: 'Point',
          coordinates: [ALL_SHIPS[i].LONGITUDE, ALL_SHIPS[i].LATITUDE],
          id: i,
        },
        icon: img,
        deg: ALL_SHIPS[i].HEADING - 90,
        data: ALL_SHIPS[i],
      });
    }
  } else {
    for (var i = 0; i < ALL_SHIPS.length; i++) {
      if (customPred(ALL_SHIPS[i])) {
        var img = new Image(0.1, 0.05);
        img.src = getShipIcon(ALL_SHIPS[i].TYPE);
        data.push({
          geometry: {
            type: 'Point',
            coordinates: [ALL_SHIPS[i].LONGITUDE, ALL_SHIPS[i].LATITUDE],
            id: i,
          },
          icon: img,
          deg: ALL_SHIPS[i].HEADING - 90,
          data: ALL_SHIPS[i],
        });
        // FILTERED_SHIPS.push(ALL_SHIPS[i]);
      }
    }
    // console.log(data.length);
  }
  // 船只
  // 第一步创建mapv示例 -船只数开始
  // 数据集
  var dataSet = new mapv.DataSet(data);
  // 添加百度地图可视化叠加图层 The OVERLAY OPTIONS!!!
  var options = {
    // zIndex: 0, // 层级
    // unit:'px',
    //fillStyle: '#df4c06',
    // shadowColor: 'rgba(255, 50, 50, 1)',
    // shadowBlur: 80,
    // styleType: 'stroke',
    // globalCompositeOperation: 'darker',
    // lineWidth: 0,
    methods: { // 一些事件回调函数
      click: function (item) { // 点击事件，返回对应点击元素的对象值
        if (item == null) return;
        addClickHandler_dot_click(item);
      },
      mousemove: function (item) { // 点击事件，返回对应点击元素的对象值
        // if (item == null) {
        //   // if (THIS_SHIP_LABEL_HOVER != null) {
        //   //   map.removeOverlay(THIS_SHIP_LABEL_HOVER);
        //   //   THIS_SHIP_LABEL_HOVER = null;

        //   return;
        // }
        setThisShipHover(item);
      }
    },
    draw: 'icon',
    width: 21, // 规定图像的宽度
    height: 10,
  };
  // map.clearOverlays();
  MAPV_LAYER = new mapv.baiduMapLayer(map, dataSet, options);
  close_load();
}

function customPred(ship) {
  const typeID = ship.TYPE;
  if (!TYPE_ARR[0] && 70 <= typeID && typeID <= 79) {
    return false;
  } else if (!TYPE_ARR[1] && 80 <= typeID && typeID <= 89) {
    return false;
  } else if (!TYPE_ARR[2] && 60 <= typeID && typeID <= 69) {
    return false;
  } else if (!TYPE_ARR[3] && 40 <= typeID && typeID <= 49) {
    return false;
  } else if (!TYPE_ARR[4] && 36 <= typeID && typeID <= 37) {
    return false;
  } else if (!TYPE_ARR[5] && typeID == 30) {
    return false;
  } else if (!TYPE_ARR[6] && typeID == 35) {
    return false;
  } else if (!TYPE_ARR[7] && 0 <= typeID && typeID <= 19 || 38 <= typeID && typeID <= 39) {
    return false;
  } else if (!TYPE_ARR[8]) {
    return false;
  } else {
    return true;
  }
}