
function showTable(fleet) {
    for (var i = 0; i < fleet.length; i++) {
        let { A, LONGITUDE, TIME, IMO, NAME, MMSI, CALLSIGN, LATITUDE, TYPE, DEST } = fleet[i]; //.data;
        A = '<td>' + A + '</td>';
        LONGITUDE = '<td>' + LONGITUDE + '</td>';
        TIME = '<td>' + TIME + '</td>';
        IMO = '<td>' + IMO + '</td>';
        NAME = '<td>' + NAME + '</td>';
        MMSI = '<td>' + MMSI + '</td>';
        CALLSIGN = '<td>' + CALLSIGN + '</td>';
        LATITUDE = '<td>' + LATITUDE + '</td>';
        TYPE = '<td>' + TYPE + '</td>';
        DEST = '<td>' + DEST + '</td>';


        $('#observe-list-table').append(
            '<tr>' +
            LONGITUDE +
            TIME +
            IMO +
            NAME +
            MMSI +
            CALLSIGN +
            LATITUDE +
            TYPE +
            DEST +
            '</tr>'
        )
    }
}
