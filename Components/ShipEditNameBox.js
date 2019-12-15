var close = document.getElementById("edit-name-close-button");
close.setAttribute("onClick", "closeEditHandler()");

function closeEditHandler() {
  document.getElementById("change-name-box").hidden = true;
}