(function () {
  $(document).ready(function () {
    $(".edit-name-close, #change-name-cancel").click(function () {
      $("#change-name-box").hide();
    });
    $("#edit-name-change").click(function () {
      if ($("#edit-name-input").val() != "") {
        $("#ship-info-nknm").text(
          $("#edit-name-input").val()
        );
        let newShipName = $("#edit-name-input").val();
        ObserveList.editShipName(newShipName);
        $("#edit-name-input").val("");
        $("#change-name-box").hide();
      }
    })
  });
}());