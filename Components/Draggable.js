$(document).ready(function () {
    $(".pop-up").draggable({
        handle: ".pop-up-header",
        containment:"#ship-map",
        stack: ".pop-up"
    });
});