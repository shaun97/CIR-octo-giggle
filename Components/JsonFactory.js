function getAllShips() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://192.168.0.113:8761/TestController/getDateJson",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

function searchForShip(MmsiIorName) {
    var query = "http://192.168.0.113:8761/TestController/getMMSI?MmsiIorName=" + MmsiIorName;

    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': query,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

var test = searchForShip(232003233); 
console.log(test);