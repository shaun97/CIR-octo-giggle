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

var test = getAllShips();
console.log(test);

function searchForShip(MmsiIorName) {

}