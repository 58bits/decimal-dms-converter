// Closure
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
// Monkey patches Math with a correct decimal rounding function.
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();


/**
 * Convert decimal to and from degrees, minutes, seconds.
 * Based on https://github.com/perfectline/geopoint
 *
 * Global convert - should be moved into a namespaced object
 * or preferred module loader for your application.
 */

// Closure
var convert = function() {

  // Constants
  var CHAR_DEG = "\u00B0";
  var CHAR_MIN = "\u0027";
  var CHAR_SEC = "\u0022";
  var CHAR_SEP = "\u0020";

  var MAX_LON = 180;
  var MAX_LAT = 90;

  /**
   * Convert decimal to degrees
   * @param value
   * @param max
   * @returns {*}
   */
  var dec2deg = function dec2deg(value, max) {

    var sign = value < 0 ? -1 : 1;

    var abs = Math.abs(Math.round(value * 1000000));

    if (abs > (max * 1000000)) {
      return NaN;
    }

    var dec = abs % 1000000 / 1000000;
    var deg = Math.floor(abs / 1000000) * sign;
    var min = Math.floor(dec * 60);
    var sec = (dec - min / 60) * 3600;

    var result = "";

    result += deg;
    result += CHAR_DEG;
    result += CHAR_SEP;
    result += min;
    result += CHAR_MIN;
    result += CHAR_SEP;
    result += sec.toFixed(2);
    result += CHAR_SEC;

    return result;

  };

  /**
   * Convert degrees to decimal
   * @param value
   * @param max
   * @returns {*}
   */
  var deg2dec = function deg2dec(value, max) {

    var matches = decode(value);

    if (!matches) {
      return NaN;
    }

    var deg = parseFloat(matches[1]);
    var min = parseFloat(matches[2]);
    var sec = parseFloat(matches[3]);

    if (isNaN(deg) || isNaN(min) || isNaN(sec)) {
      return NaN;
    }

    if(Math.abs(deg) > max) {
      return NaN;
    }

    var sign = deg < 0 ? -1 : 1;

    // NOTE: According to both...
    // https://www.fcc.gov/media/radio/dms-decimal and
    // https://data.aad.gov.au/aadc/calc/dms_decimal.cfm
    // this is the correct way to calculate a decimal value from degrees,
    // including negative values.
    var dec = (Math.abs(deg) + (min / 60.0) + (sec / 3600)) * sign;
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    return Math.round10(dec, -6);
  };

  /**
   * Validate and parse degrees text input
   * @param value
   * @returns {*}
   */
  var decode = function decode(value) {
    var pattern = "";

    // deg
    pattern += "(-?\\d+)";
    pattern += CHAR_DEG;
    pattern += "\\s*";

    // min
    pattern += "(\\d+)";
    pattern += CHAR_MIN;
    pattern += "\\s*";

    // sec
    pattern += "(\\d+(?:\\.\\d+)?)";
    pattern += CHAR_SEC;

    return value.match(new RegExp(pattern));
  };

  /**
   * Public interface
   */
  return {
    latDec2Deg: function (value) {
      return dec2deg(value, MAX_LAT)
    },

    lonDec2Deg: function (value) {
      return dec2deg(value, MAX_LON)
    },

    latDeg2Dec: function (value) {
      return deg2dec(value, MAX_LAT)
    },

    lonDeg2Dec: function (value) {
      return deg2dec(value, MAX_LON)
    }
  }

}();