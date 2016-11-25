Javascript Decimal to and from Degrees Converter
================================================

Javascript library to convert latitude/longitude between decimal degrees and degrees,minutes and seconds.

Based on https://github.com/perfectline/geopoint, and re-written in the JavaScript module pattern, without intermediate 'point' object creation to support 'convert as you type' (onchange events) UI converter.

This library expects latitude and longitude in EPSG:4326 (WGS84). To convert between different projections check out [Proj4js](http://proj4js.org//)

Convert decimal -> degrees
--------------------------

    <script type="text/javascript" src="converter.js"></script>
    <script type="text/javascript">

        var lon = 24.725045;
        var lat = 58.745547;

        var lon_degrees = convert.lonDec2Deg(lon);
        var lat_degrees = convert.latDec2Deg(lat);

        console.log(lon_degrees); // 24° 43' 30.16"
        console.log(lat_degrees); // 58° 44' 43.97"

    </script>

Convert degrees -> decimal
--------------------------
    <script type="text/javascript" src="converter.js"></script>
    <script type="text/javascript">

        var lon = "24° 43' 30.16\"";
        var lat = "58° 44' 43.97\"";

        var lon_decimal = convert.lonDeg2Dec(lon);
        var lat_decimal = convert.latDeg2Dec(lat);

                
        console.log(lon_decimal); // 24.725044
        console.log(lat_decimal); // 58.745547
        
    </script>

Authors
-------
**Anthony Bouch** (<http://twitter.com/t2tenz>)

Original Authors 
----------------
**Tanel Suurhans** (<http://twitter.com/tanelsuurhans>)  
**Tarmo Lehtpuu** (<http://twitter.com/tarmolehtpuu>)

License
-------
Copyright Infonomic Co., Ltd. (<https://infonomic.io>) Portions Copyright 2011 by PerfectLine LLC (<http://www.perfectline.ee>). Released under the MIT license.