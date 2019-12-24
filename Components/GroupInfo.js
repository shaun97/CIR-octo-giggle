$(document).ready(function () {
  $("#group-info-close-button").click(function () {
    $("#group-info-box").hide();
  });
});

function showTable(fleet, fleetName) {
  $('#observe-list-table tr').slice(1).remove();
  for (var i = 0; i < fleet.length; i++) {
      let { A, LONGITUDE, TIME, IMO, NAME, MMSI, CALLSIGN, LATITUDE, TYPE, DEST } = fleet[i].data; //.data;
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
      FLEETNAME = '<td>' + fleetName + '</td>';

      $('#observe-list-table').append(
          '<tr>' +
          FLEETNAME +
          NAME +
          LONGITUDE +
          TIME +
          IMO +
          MMSI +
          CALLSIGN +
          LATITUDE +
          TYPE +
          DEST +
          '</tr>'
      )
  }
}