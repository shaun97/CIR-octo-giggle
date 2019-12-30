$('.se_btn').click(function () {
    map.setDefaultCursor('wait');
    var MmsiIorName = $('.search_box2_child').val().trim();

    let latestShip = null;
    for (let i = 0; i < ALL_SHIPS.length; i++) {
        let ship = ALL_SHIPS[i];
        if (ship.MMSI == MmsiIorName) {
            latestShip = ship;
        }
    }
    if (latestShip == null) {
        map.setDefaultCursor('default');
        alert("No ship found");
        return;
    }

    let point = new BMap.Point(latestShip['LONGITUDE1'], latestShip['LATITUDE1']);

    if (map.getZoom() < 12) map.setZoom(12);
    map.panTo(point, true);//设置中心点和显示级别。中国

    let item = { data: latestShip };
    setThisShipSel(item);
    showData(item);
});