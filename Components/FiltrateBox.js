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
  $("#option-type-freighter-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })


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

  $("#option-type-tugboat-btn").click(function () {
    $(this).toggleClass("grey-button");
    if ($(this).hasClass("grey-button")) {
      $("#selector-all-button").addClass("grey-button");
    } else {
      $("#selector-clear-button").addClass("grey-button");
    };
  })

  $("#option-type-fish-btn").click(function () {
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

  $("#option-type-others-btn").click(function () {
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
});



