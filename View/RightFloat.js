$(document).ready(function () {
  $("#star-button").click(function () {
    $('#observe-list-box').css('z-index', '3');
    $('#ship-filtrate-box').css('z-index', '2');
    $("#observe-list-box").show();
    $("#observe-write").hide()
    $("#observe-read").show();
  });
});

$(document).ready(function () {
  $("#filtrate-button").click(function () {
    $('#ship-filtrate-box').css('z-index', '3');
    $('#observe-list-box').css('z-index', '2');
    $("#ship-filtrate-box").show();
    $("#filtrate-option-custom-close").click()
  });
});