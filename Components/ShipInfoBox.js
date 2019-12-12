var close = document.getElementById("close-button-infobox");
close.setAttribute("onClick", "closeHandler()");

function closeHandler() {
  document.getElementById("pop-up-ship-info").hidden = true;
}