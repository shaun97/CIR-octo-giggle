$(document).ready(function () {
  $(".edit-name-close").click(function () {
    $("#change-name-box").hide();
  });
  $("#edit-name-change").click(function () {
    if ($("#edit-name-input").val() != "") {
      $("#ship-info-nknm").text(
        $("#edit-name-input").val()
      );
      THIS_SHIP_ITEM.data['NICKNAME'] = $("#edit-name-input").val();
      $("#change-name-box").hide();
    }
  })
});
