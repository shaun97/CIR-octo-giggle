$('.se_btn').click(function () {
    var MmsiIorName = $('.search_box2_child').val();

    $.ajax({
        url: 'http://192.168.0.121:8761/shipsController/getMMSI?MmsiIorName=' + MmsiIorName,
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {
            console.log(data);
            var latestPoint = data.data[0];
            data.data.forEach(point => {
                latestTime = new Date(latestPoint.TIME).getTime();
                currTime = new Date(point.TIME).getTime();
                if (currTime > latestTime) {
                    latestPoint = point;
                }
            });
            map.centerAndZoom(new BMap.Point(latestPoint.LONGITUDE, latestPoint.LATITUDE), 9);//设置中心点和显示级别。中国。x
            let { A, DRAUGHT, B, C, NAVSTAT, D, LONGITUDE, TIME, SOG, IMO, NAME, HEADING,
                MMSI, CALLSIGN, ETA, ROT, COG, LATITUDE, TYPE, DEST } = latestPoint;
            $("#ship-info-box").show();
            $("#ship-info-nknm").text(NAME == null ? "-" : NAME);
            $("#ship-info-name").text(NAME == null ? "-" : NAME);
            $("#ship-info-id-m").text(IMO == null ? "-" : IMO);
            $("#ship-info-length").text(A == null ? "-" : A);
            $("#ship-info-dest").text(DEST == null ? "-" : DEST);
            $("#ship-info-time").text(TIME == null ? "-" : TIME);
            $("#ship-info-id-l").text(MMSI == null ? "-" : MMSI);
            $("#ship-info-id-s").text(CALLSIGN == null ? "-" : CALLSIGN);
            $("#ship-info-type").text(TYPE == null ? "-" : TYPE);
            $("#ship-info-lng").text(LONGITUDE == null ? "-" : LONGITUDE);
            $("#ship-info-lat").text(LATITUDE == null ? "-" : LATITUDE);
            cha_info(MMSI);

        },
        error: function () {
            alert("Ship not found");
        }
    });
});