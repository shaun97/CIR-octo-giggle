var close = document.getElementById("star-button");
close.setAttribute("onClick", "observeOpenHandler()");

function observeOpenHandler() {
  document.getElementById("observed-list-box").hidden = false;
}

var close = document.getElementById("observed-close-button");
close.setAttribute("onClick", "closeObservedHandler()");

function closeObservedHandler() {
  document.getElementById("observed-list-box").hidden = true;
}