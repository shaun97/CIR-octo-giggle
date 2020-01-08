var ALL_SHIPS = [];
var CURRENT_SHIPS

//States
var MAPV_LAYER;
var CLEAR_LAYER;
var ZOOM_SHIP_OFFSET = 12;

var BOAT_MARKERS = [];
var MAP_VIEW = true;
var THIS_SHIP_ITEM = null;
var THIS_SHIP_ITEM_HOVER = null;
var THIS_SHIP_LABEL = null;
var THIS_SHIP_LABEL_HOVER = null;

var HISTORY_DATA = null;
var TRACK_MARKERS = [];

const FLEETS = {};
let FLEET_NAME_LIST = [];

let TYPE_ARR = Array(9).fill(true);
let TYPE_FLTR = true;
let SIZE_ARR = Array(8).fill(true);
let SIZE_FLTR = true;
let MOVE_ARR = Array(2).fill(true);

let SPEED_CHART = null;
