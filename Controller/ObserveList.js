var ObserveList = (function () {
    function addFleet(newFleetName) {
        if (newFleetName == "") {
            throw "Please enter something for the fleet name";
        } else if (FLEET_NAME_LIST.includes(newFleetName)) {
            throw "Fleet already exist"
        } else {
            var fleetNameId = newFleetName.replace(" ", "_");
            FLEETS[fleetNameId] = [];
            FLEET_NAME_LIST.push(newFleetName);
            insertGroupAttention(newFleetName);
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
            ObserveListView.printFleetNameTree(fleetName, fleetNameId);
        }

        if (!FLEETS[fleetNameId].reduce((x, y) => x && (y.data.MMSI != THIS_SHIP_ITEM.data.MMSI), true)) {
            throw 'This ship is already in the fleet';
        };

        FLEETS[fleetNameId].push(THIS_SHIP_ITEM);
        ObserveListView.printShipsTree(fleetName, fleetNameId, THIS_SHIP_ITEM, true);
        insertShipAttention(fleetName, THIS_SHIP_ITEM.data.NICKNAME, THIS_SHIP_ITEM.data.MMSI)
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
        FiltrateBox.filterShips(data);
    }

    function showIndivShips(ship) {
        ship.doShow = !ship.doShow;
        if ($('.layui-form-checkbox').hasClass("layui-form-checked")) {
            hideOtherShips();
        } else {
            FiltrateBox.filterShips(ALL_SHIPS);
        }
    }

    function toggleFleet(fleet, doShow, fleetNameId) {
        for (var i = 0; i < fleet.length; i++) {
            fleet[i].doShow = doShow;
            $(`#eye-${fleetNameId}-${fleet[i].data.MMSI}`)
                .html(doShow ? '<img src="./img/icon_hide.png" class="tree-button-icon">' : '<img src="./img/icon_open.png" class="tree-button-icon">');
        }

        if ($('.layui-form-checkbox').hasClass("layui-form-checked")) {
            hideOtherShips();
        } else {
            FiltrateBox.filterShips(ALL_SHIPS);
        }
    }

    function addShipToGroupLoad(fleetName, fleetNameId, MMSI, shipName) {
        let tempShip = null;
        for (var i = 0; i < ALL_SHIPS.length; i++) {
            if (ALL_SHIPS[i].data.MMSI == MMSI) {
                tempShip = ALL_SHIPS[i];
                tempShip.data.NICKNAME = shipName;

                break;
            }
        }
        if (tempShip != null) {
            FLEETS[fleetNameId].push(tempShip);
            ObserveListView.printShipsTree(fleetName, fleetNameId, tempShip, false);
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
            ObserveListView.printFleetNameTree(newFleetName, fleetNameId);

            //loop through all the ships in this group
            for (var j = 0; j < data[i].MMSI.length; j++) {
                let MMSI = data[i].MMSI[j];
                let shipName = data[i].shipName[j];
                addShipToGroupLoad(newFleetName, fleetNameId, MMSI, shipName);
            }
            ObserveListView.updateNumBoatsHeader();
        }
    }


    function editFleetName(oldFleetName, newFleetName) {
        if (newFleetName == "") {
            throw "Please enter something for the fleet name";
        } else if (FLEET_NAME_LIST.includes(newFleetName)) {
            throw "Fleet already exist"
        } else {
            var newFleetNameId = newFleetName.replace(" ", "_");
            var oldFleetNameId = oldFleetName.replace(" ", "_");

            //Update the global with the new fleet name
            FLEETS[newFleetNameId] = FLEETS[oldFleetNameId];
            delete FLEETS[oldFleetName];

            FLEET_NAME_LIST.pop(oldFleetName);
            FLEET_NAME_LIST.push(newFleetName);

            //AJAX CALL


        }
    }

    function editShipName(oldShipName, newShipName, item, fleetNameId, shipHTML) {
        //Admin parsing
        if (fleetName == "") {
            throw "Please enter something for the fleet name";
        }

        var newShipNameId = newShipName.replace(" ", "_");
        var oldShipNameId = oldShipName.replace(" ", "_");

        //Update html and html ID
        var newShipNameHTMLId = newShipName.replace(" ","-");
        shipHTML.id = newShipNameHTMLId;
        shipHTML.html = newShipName;


        //Update Globals & Nickname

        //Update backend 

        //showData
    }



    return {
        addFleet: addFleet,
        addShipToFleet: addShipToFleet,
        hideOtherShips: hideOtherShips,
        showIndivShips: showIndivShips,
        toggleFleet: toggleFleet,
        loadGuanZhu: loadGuanZhu,
        editFleetName: editFleetName
    }
}());

