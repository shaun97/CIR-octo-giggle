var close = document.getElementById("close-button-editnamebox");
close.setAttribute("onClick", "closeEditHandler()");

function closeEditHandler() {
  // alert("close plz");
  document.getElementById("pop-up-change-name").hidden = true;
}