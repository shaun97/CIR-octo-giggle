var FiltrateView = (function () {
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
      console.time("real filter");
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

      FiltrateView.resetViewForFilter();

      if ($('.layui-form-checkbox').hasClass("layui-form-checked")) {
        ObserveList.hideOtherShips();
      } else {
        FiltrateBox.filterShips(ALL_SHIPS);
      }
      $("#ship-info-box").hide();
      MAPV_LAYER.show();
      console.timeEnd('real filter');
    })
  });
  function resetViewForFilter() {
    if (!MAP_VIEW) ShipMapView.clearTrack();
    map.clearOverlays();
    ShipMap.setThisShipSel(null);
  }
  return {
    resetViewForFilter: resetViewForFilter
  }
}());