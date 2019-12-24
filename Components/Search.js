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

            // console.log(data.data);
            if (data.data.length == 0) {
                alert('This ship does not exist');
                return;
            }

            // Uncomment this! -----------------------------------------
            var latestPoint = data.data[0];
            data.data.forEach(point => {
                latestTime = new Date(latestPoint.TIME).getTime();
                currTime = new Date(point.TIME).getTime();
                if (currTime > latestTime) {
                    latestPoint = point;
                }
            });
            // Uncomment this! -----------------------------------------

            var myIcon = new BMap.Icon("img/boat_m.png", new BMap.Size(15, 39), {
                offset: new BMap.Size(5, 5),
            });

            let point = new BMap.Point(latestPoint.LONGITUDE, latestPoint.LATITUDE);

            map.centerAndZoom(point, 9);//设置中心点和显示级别。中国
            resetView();

            let marker = new BMap.Marker(point, { icon: myIcon });
            drawBoatMarker(marker, latestPoint, true);
            
            showData(marker);
            // let { A, DRAUGHT, B, C, NAVSTAT, D, LONGITUDE, TIME, SOG, IMO, NAME, HEADING,
            //     MMSI, CALLSIGN, ETA, ROT, COG, LATITUDE, TYPE, DEST } = marker.data;
            // $("#ship-info-box").show();
            // $("#ship-info-nknm").text(NAME == null ? "-" : NAME);
            // $("#ship-info-name").text(NAME == null ? "-" : NAME);
            // $("#ship-info-id-m").text(IMO == null ? "-" : IMO);
            // $("#ship-info-length").text(A == null ? "-" : A);
            // $("#ship-info-dest").text(DEST == null ? "-" : DEST);
            // $("#ship-info-time").text(TIME == null ? "-" : TIME);
            // $("#ship-info-id-l").text(MMSI == null ? "-" : MMSI);
            // $("#ship-info-id-s").text(CALLSIGN == null ? "-" : CALLSIGN);
            // $("#ship-info-type").text(TYPE == null ? "-" : TYPE);
            // $("#ship-info-lng").text(LONGITUDE == null ? "-" : LONGITUDE);
            // $("#ship-info-lat").text(LATITUDE == null ? "-" : LATITUDE);
            // cha_info(MMSI);
        },
        error: function () {
            alert("Ship not found");
        }
    });
});