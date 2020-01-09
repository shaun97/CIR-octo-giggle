(function () {
  $(document).ready(function () {
    $("#star-button").click(function () {
      if (!CHECKBOX_FUNCTIONALITY) ObserveListView.setupCheckbox(); CHECKBOX_FUNCTIONALITY = true;
      $('.pop-up').css('z-index', '1');
      $('#observe-list-box').css('z-index', '2');
      $("#observe-list-box").show();
      $("#observe-write").hide()
      $("#observe-read").show();
    });
  });

  $(document).ready(function () {
    $("#filtrate-button").click(function () {
      $('.pop-up').css('z-index', '1');
      $('#ship-filtrate-box').css('z-index', '2');
      $("#ship-filtrate-box").show();
      $("#filtrate-option-custom-close").click()
    });
  });
  
}());