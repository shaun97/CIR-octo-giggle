$(document).ready(function () {
  $("#observed-close-button").click(function () {
    $("#observed-list-box").hide();
  });
});

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-icon-down");
  });
}