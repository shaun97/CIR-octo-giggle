layui.use(['element', 'layer'], function () {
  var element = layui.element;
  var layer = layui.layer;
});

$(document).ready(function () {
  $("#observe-close-button").click(function () {
    $("#observe-list-box").hide();
  });
  $("#observe-add-ship").click(function () {
    $("#observe-write").show();
    $("#observe-read").hide();
  });
  $(".tree-button").click(function (e) {
    e.stopPropagation();
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