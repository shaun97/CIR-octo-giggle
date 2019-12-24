// let TYPE_FREIGHTER = true; // 70 - 79
// let TYPE_CONTAINER = true; // 70 - 79
// let TYPE_OIL = true; // 80 - 89
// let TYPE_TUGBOAT = true; // 52 
// let TYPE_FISH = true; // 30
// let TYPE_PASSENGER = true; // 60 - 69
// let TYPE_OTHERS = true; // Others 
let TYPE_ARR = Array(7).fill(true);

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
    TYPE_ARR[0] = $('#option-type-freighter-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[1] = $('#option-type-container-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[2] = $('#option-type-oil-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[3] = $('#option-type-tugboat-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[4] = $('#option-type-fish-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[5] = $('#option-type-passenger-btn').hasClass("grey-button") ? false : true;
    TYPE_ARR[6] = $('#option-type-others-btn').hasClass("grey-button") ? false : true;
    let boo = TYPE_ARR.reduce((x, y) => x && y, true);
    console.log(boo, TYPE_ARR);
    filterShips(boo);
    resetView();
  })
});

function filterShips(boo) {
  var data = [];
  if (boo) { // No filter
    // console.log(ALL_SHIPS.length);
    for (var i = 0; i < ALL_SHIPS.length; i++) {
      ALL_SHIPS[i].show = true;
      data.push({
        geometry: {
          type: 'Point',
          coordinates: [ALL_SHIPS[i].LONGITUDE, ALL_SHIPS[i].LATITUDE],
          id: i,
        }
      });
    }
  } else {
    for (var i = 0; i < ALL_SHIPS.length; i++) {
      if (customPred(ALL_SHIPS[i])) {
        data.push({
          geometry: {
            type: 'Point',
            coordinates: [ALL_SHIPS[i].LONGITUDE, ALL_SHIPS[i].LATITUDE],
            id: i,
          }
        });
        // FILTERED_SHIPS.push(ALL_SHIPS[i]);
      } else {
        ALL_SHIPS[i].show = false;
      }
    }
  }
  // 船只
  // 第一步创建mapv示例 -船只数开始
  // 数据集
  var dataSet = new mapv.DataSet(data);
  // 添加百度地图可视化叠加图层 The OVERLAY OPTIONS!!!
  var options = {
    // zIndex: 0, // 层级
    // unit:'px',
    fillStyle: '#df4c06',
    // shadowColor: 'rgba(255, 50, 50, 1)',
    // shadowBlur: 80,
    // styleType: 'stroke',
    globalCompositeOperation: 'darker',
    // lineWidth: 0,
    methods: { // 一些事件回调函数
      click: function (item) { // 点击事件，返回对应点击元素的对象值
        // console.log(item);
        // var localtion=item.geometry.coordinates;
        // //BMap.Point(localtion)会报错，需要分开写
        // map.centerAndZoom(new BMap.Point(localtion[0],localtion[1]),5);
      }
    },
    draw: 'simple',
    size: 2,
  };
  MAPV_LAYER = new mapv.baiduMapLayer(map, dataSet, options);
}

function customPred(ship) {
  let type = ship.TYPE;
  if (!TYPE_ARR[0] && type < 80 && type > 69) {
    return false;
  }
  if (!TYPE_ARR[1] && type < 80 && type > 69) {
    return false;
  }
  if (!TYPE_ARR[2] && type < 90 && type > 79) {
    return false;
  }
  if (!TYPE_ARR[3] && type == 52) {
    return false;
  }
  if (!TYPE_ARR[4] && type == 30) {
    return false;
  } else if (!TYPE_ARR[5] && type < 70 && type > 59) {
    return false;
  }
  // if (!TYPE_ARR[6] && type != 30 && type != 52 && type < 60 && type >= 90) {
  if (!TYPE_ARR[6]) {
    return false;
  }
  return true;
}