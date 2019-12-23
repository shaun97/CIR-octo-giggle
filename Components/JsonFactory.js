function getAllShips() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://192.168.0.121:8761/TestController/getDateJson",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

function searchForShip(MmsiIorName) {
    var json = null;
     $.ajax({
        url: 'http://192.168.0.121:8761/shipsController/getMMSI?MmsiIorName=' + MmsiIorName,
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {
            json = data;
           // console.log(data);
            return json.responseDATA;
        },
        error: function () {
            alert("Ship not found");
        }
    });
}
