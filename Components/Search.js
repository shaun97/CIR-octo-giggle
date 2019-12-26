let SEARCH_SHIP = null;

$('.se_btn').click(function () {
    map.setDefaultCursor('wait');
    var MmsiIorName = $('.search_box2_child').val().trim();

    $.ajax({
        url: `http://${IP_ADDRESS}/shipsController/getMMSI?MmsiIorName=` + MmsiIorName,
        // url: 'http://localhost:3000/data',
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {

            map.setDefaultCursor('default');

            // Uncomment this! -----------------------------------------
            
            if (data.data.length == 0) {
                alert('This ship does not exist');
                return;
            }
            var latestPoint = data.data[0];
            data.data.forEach(point => {
                latestTime = new Date(latestPoint.TIME).getTime();
                currTime = new Date(point.TIME).getTime();
                if (currTime > latestTime) {
                    latestPoint = point;
                }
            });
            // */
            // Uncomment this! -----------------------------------------

            // ----------------------------------- MOCK ----------------------------------- //
            /*
            var latestPoint = {
                NAME: 'CHANGRAN61',
                MMSI: 413821923,
                LONGITUDE: 106.62659,
                LATITUDE: 34.4663,
                LONGITUDE1: 106.63787160112857,
                LATITUDE1: 29.599258851919817,
                TIME: '2019-12-20 08:55:25 GMT',
            }
            // */
            // ----------------------------------- MOCK ----------------------------------- //

            let point = new BMap.Point(latestPoint['LONGITUDE1'], latestPoint['LATITUDE1']);

            if (map.getZoom() < 12) map.setZoom(12);
            map.panTo(point, true);//设置中心点和显示级别。中国
            
            let item = {data: latestPoint};
            setThisShipSel(item);
            // console.log(item);
            showData(item);
            
        },
        error: function () {
            map.setDefaultCursor('default');
            alert("API call error, check your connection.");
        }
    });
});