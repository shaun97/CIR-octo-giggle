var close = document.getElementById("close-button-infobox");
close.setAttribute("onClick", "closeInfoHandler()");

function closeInfoHandler() {
  document.getElementById("pop-up-ship-info").hidden = true;
}

var close = document.getElementById("edit-button-infobox");
close.setAttribute("onClick", "editHandler()");

function editHandler() {
  document.getElementById("pop-up-change-name").hidden = false;
}