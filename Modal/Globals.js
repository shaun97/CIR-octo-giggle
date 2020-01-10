const IP_ADDRESS = '117.78.28.83:8761';
// const IP_ADDRESS = '192.168.0.181:8761';

let USER_KEY = '11';

// ALL_SHIPS : Array of Geo items (查看vmap API). 在initMap处填写.
var ALL_SHIPS = [];

// CURRENT_SHIPS : Array of Geo items (查看vmap API).
var CURRENT_SHIPS

// B_Map Map
var MAP = null;

// 视图有两个主要状态：“MAP_VIEW”和“TRACK_VIEW”。这在“MAP_VIEW”上是“true”
var MAP_VIEW = true;

// vmap层
var MAPV_LAYER;
var CLEAR_LAYER; 


var THIS_SHIP_ITEM = null;
var THIS_SHIP_ITEM_HOVER = null;
var THIS_SHIP_LABEL = null;
var THIS_SHIP_LABEL_HOVER = null;

// Array of data of a single ship. Used for track.
var HISTORY_DATA = null;
var TRACK_MARKERS = [];

const FLEETS = {};
let FLEET_NAME_LIST = [];

// 筛选状态
var ZOOM_SHIP_OFFSET = 12;
let TYPE_ARR = Array(9).fill(true);
let TYPE_FLTR = true;
let SIZE_ARR = Array(8).fill(true);
let SIZE_FLTR = true;
let MOVE_ARR = Array(2).fill(true);

let SPEED_CHART = null;

// 检查是否添加了复选框功能
let CHECKBOX_FUNCTIONALITY = false;
