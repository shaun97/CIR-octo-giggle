$(document).ready(function () {
  $(".edit-name-close").click(function () {
    $("#change-name-box").hide();
  });
  $("#edit-name-change").click(function () {
    $("#ship-info-nknm").text(
      $("#edit-name-input").val()
    );
    // Need to call backend to update value!!!
  })
});
