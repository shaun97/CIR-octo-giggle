    /**
     * Initialise BMap
     */
    var map = new BMap.Map("container");
    // create a map instance
    var point = new BMap.Point(116.404, 39.915);
    // Create point coordinates   
    map.centerAndZoom(point, 11);
