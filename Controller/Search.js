/**
 * JSON Object storing the funcitons required for search
 */
(function () {
    $('.se_btn').click(function () {
        MAP.setDefaultCursor('wait');
        var MmsiIorName = $('.search_box2_child').val().trim();

        let latestShip = null;
        let ship;

        //Loops through all the ships and find the ship in our local array of ships
        for (let i = 0; i < ALL_SHIPS.length; i++) {
            ship = ALL_SHIPS[i].data;
            if (ship.MMSI == MmsiIorName) {
                latestShip = ALL_SHIPS[i];
                break;
            }
        }

        //Throws an error if not found in local ships
        if (latestShip == null) {
            MAP.setDefaultCursor('default');
            alert("No ship found");
            return;
        }

        let point = new BMap.Point(latestShip.data['LONGITUDE1'], latestShip.data['LATITUDE1']);

<<<<<<< HEAD
        //Zooms in to the particular ship
        if (map.getZoom() < 12) map.setZoom(12);
        map.centerAndZoom(point, map.getZoom());//设置中心点和显示级别。中国
=======
        if (MAP.getZoom() < 12) MAP.setZoom(12);
        MAP.centerAndZoom(point, MAP.getZoom());//设置中心点和显示级别。中国
>>>>>>> 6e5816bdf7fe0c42e06537a02fa6a2c747a03ddb

        console.log('latest', latestShip);

        //Set is as selected ship and shows the popup for the info
        ShipMap.setThisShipSel(latestShip);
        ShipInfoBox.showData(latestShip.data);
    });
}());