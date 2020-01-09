$('.se_btn').click(function () {
    map.setDefaultCursor('wait');
    var MmsiIorName = $('.search_box2_child').val().trim();

    let latestShip = null;
    let ship;
    for (let i = 0; i < ALL_SHIPS.length; i++) {
        ship = ALL_SHIPS[i].data;
        if (ship.MMSI == MmsiIorName) {
            latestShip = ALL_SHIPS[i]; 
            break;
        }
    }
    if (latestShip == null) {
        map.setDefaultCursor('default');
        alert("No ship found");
        return;
    }

    let point = new BMap.Point(latestShip.data['LONGITUDE1'], latestShip.data['LATITUDE1']);

    if (map.getZoom() < 12) map.setZoom(12);
    map.centerAndZoom(point, map.getZoom());//设置中心点和显示级别。中国

    console.log('latest', latestShip)
    setThisShipSel(latestShip);
    ShipInfoBox.showData(latestShip.data);
});