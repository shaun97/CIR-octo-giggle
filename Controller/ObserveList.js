function addFleet(newFleetName) {
    if (newFleetName == "") {
        throw "Please enter something for the fleet name";
    } else if (FLEET_NAME_LIST.includes(newFleetName)) {
        throw "Fleet already exist"
    } else {
        var fleetNameId = newFleetName.replace(" ", "_");
        FLEETS[fleetNameId] = [];
        FLEET_NAME_LIST.push(newFleetName);
        return fleetNameId;
    }
}

function addShipToFleet(fleetName) {
    if (fleetName == "") {
        throw "Please enter something for the fleet name";
    }
    if (THIS_SHIP_ITEM == null) {
        throw 'Please select a ship and try again';
    }
    var fleetNameId = fleetName.replace(" ", "_");

    //new fleet
    if (!FLEET_NAME_LIST.includes(fleetName)) {
        FLEETS[fleetNameId] = [];
        FLEET_NAME_LIST.push(fleetName);
        printFleetNameTree(fleetName, fleetNameId);
    }

    if (!FLEETS[fleetNameId].reduce((x, y) => x && (y.data.MMSI != THIS_SHIP_ITEM.data.MMSI), true)) {
        throw 'This ship is already in the fleet';
    };

    FLEETS[fleetNameId].push(THIS_SHIP_ITEM);
    printShipsTree(fleetName, fleetNameId, THIS_SHIP_ITEM);
    return THIS_SHIP_ITEM;
}

function hideOtherShips() {
    var data = [];
    jQuery.each(FLEETS, function (fleetName, ships) {
        jQuery.each(ships, function (i, val) {
            data.push(val);
        })
    });
    console.log('data to hide', data);
    filterShips(data);
}

function showIndivShips(ship) {
    ship.doShow = !ship.doShow;

    if ($('.layui-form-checkbox').hasClass("layui-form-checked")) {
        hideOtherShips();
    } else {
        filterShips(ALL_SHIPS);
    }
}

function toggleFleet(fleet, doShow) {
    for (var i = 0; i < fleet.length; i++) {
        fleet[i].doShow = doShow;
    }

    if ($('.layui-form-checkbox').hasClass("layui-form-checked")) {
        hideOtherShips();
    } else {
        filterShips(ALL_SHIPS);
    }
}

function addShipToGroup(fleetName, fleetNameId, MMSI, shipName) {
    let tempShip = null;
    for (var i = 0; i < ALL_SHIPS.length; i++) {
        if (ALL_SHIPS[i].data.MMSI == MMSI) {
            tempShip = ALL_SHIPS[i];
            tempShip.NICKNAME = shipName;
            break;
        }
    }
    if (tempShip != null) {
        FLEETS[fleetNameId].push(tempShip);
        printShipsTree(fleetName, fleetNameId, tempShip);
    } else {
        //Not added as ship is not found
    }
}


function loadGuanZhu(data) {
    for (var i = 0; i < data.length; i++) {
        var newFleetName = data[i].shipGroup;
        var fleetNameId = newFleetName.replace(" ", "_");
        FLEETS[fleetNameId] = [];
        FLEET_NAME_LIST.push(newFleetName);
        printFleetNameTree(newFleetName, fleetNameId);

        //loop through all the ships in this group
         for (var j = 0; j < data[i].MMSI.length; j++) {
             let MMSI = data[i].MMSI[j];
             let shipName = data[i].shipName[j];
            addShipToGroup(newFleetName, fleetNameId, MMSI, shipName);
         }
    }
}

