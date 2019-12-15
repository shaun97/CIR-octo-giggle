var close = document.getElementById("info-close-button");
close.setAttribute("onClick", "closeInfoHandler()");

function closeInfoHandler() {
  document.getElementById("ship-info-box").hidden = true;
}

var close = document.getElementById("info-edit-button");
close.setAttribute("onClick", "editHandler()");

function editHandler() {
  document.getElementById("change-name-box").hidden = false;
}