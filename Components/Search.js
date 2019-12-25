let SEARCH_SHIP = null;

$('.se_btn').click(function () {
    var MmsiIorName = $('.search_box2_child').val().trim();

    $.ajax({
        url: `http://${IP_ADDRESS}/shipsController/getMMSI?MmsiIorName=` + MmsiIorName,
        // url: 'http://localhost:3000/data',
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {
            // console.log(data);

            // Mock! -----------------------------------------
            // var latestPoint = {
            //     NAME: 'EBISU MARU',
            //     MMSI: 431003062,
            //     LONGITUDE: 135.20725,
            //     LATITUDE: 34.4663,
            //     TIME: '2019-12-20 08:55:25 GMT',
            // }
            // Mock! -----------------------------------------

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
            // Uncomment this! -----------------------------------------

            let point = new BMap.Point(latestPoint.LONGITUDE, latestPoint.LATITUDE);

            map.centerAndZoom(point, 11);//设置中心点和显示级别。中国
            
            let item = {data: latestPoint};
            setThisShipSel(item);
            console.log(item);
            showData(item);
        },
        error: function () {
            alert("Ship not found");
        }
    });
});