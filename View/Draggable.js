/**
 * 按“header”拖动“pop-up”的Jquery代码
 */
(function () {
    $(document).ready(function () {
        $(".pop-up").draggable({
            handle: ".pop-up-header",
            containment: "#ship-map",
            stack: ".pop-up",
            cursor: "move",
        });
        $("#ship-info-box").click(() => {
            $(".pop-up").css('z-index', '1');
            $("#ship-info-box").css('z-index', '2');
        });
        $("#ship-filtrate-box").click(() => {
            $(".pop-up").css('z-index', '1');
            $("#ship-filtrate-box").css('z-index', '2');
        });
        $("#observe-list-box").click(() => {
            $(".pop-up").css('z-index', '1');
            $("#observe-list-box").css('z-index', '2');
        });
        $("#change-name-box").click(() => {
            $(".pop-up").css('z-index', '1');
            $("#change-name-box").css('z-index', '2');
        });
    });
}());