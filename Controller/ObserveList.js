
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