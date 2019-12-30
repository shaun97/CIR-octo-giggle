$(document).ready(function () {
  $("#group-info-close-button").click(function () {
    $("#group-info-box").hide();
  });
});

function showTable(fleet, fleetName) {
  $('#observe-list-table tr').slice(1).remove();
  for (var i = 0; i < fleet.length; i++) {
      let { A, LONGITUDE, TIME, IMO, NAME, MMSI, CALLSIGN, LATITUDE, TYPE, DEST, SOG, DRAUGHT, ETA} = fleet[i].data; //.data;
      let o = '<td>';
      let c = '</td>';

      FLEETNAME = o + fleetName + c;
      NAME = o + NAME + c;
      MMSI = o + MMSI + c;
      CALLSIGN = o + CALLSIGN + c;
      LONGITUDE = o + LONGITUDE + c;
      LATITUDE = o + LATITUDE + c;
      SOG = o + SOG + c;
      DRAUGHT = o + DRAUGHT + c;
      DEST = o + DEST + c;
      ETA = o + ETA + c;
      TIME = o + convertDateToString(TIME) + c;

      $('#observe-list-table').append(
          '<tr>' +
          FLEETNAME +
          NAME +
          MMSI +
          CALLSIGN +
          LONGITUDE + 
          LATITUDE +
          SOG +
          DRAUGHT + 
          DEST +
          ETA +
          TIME +
          '</tr>'
      )
  }
}