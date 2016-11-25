var assert = chai.assert;

describe('GeoConvert', function() {

  /**
   * Decimal to Degrees
   */
  describe('Decimal to Degrees', function() {

    it('should convert positive decimal longitude to degrees longitude', function () {
      var degrees = convert.lonDec2Deg(25.23232);
      console.log(degrees);
      assert.equal(degrees, "25\u00B0 13\u0027 56.35\u0022");
    });

    it('should convert negative decimal longitude to degrees longitude', function () {
      var degrees = convert.lonDec2Deg(-25.23232);
      console.log(degrees);
      assert.equal(degrees, "-25\u00B0 13\u0027 56.35\u0022");
    });

    it('should return NaN for invalid decimal longitude value', function () {
      var degrees = convert.lonDec2Deg(181);
      console.log(degrees);
      assert.equal(isNaN(degrees), true);
    });

    it('should convert positive decimal latitude to degrees latitude', function () {
      var degrees = convert.latDec2Deg(25.23232);
      console.log(degrees);
      assert.equal(degrees, "25\u00B0 13\u0027 56.35\u0022");
    });

    it('should convert negative decimal latitude to degrees latitude', function () {
      var degrees = convert.latDec2Deg(-25.23232);
      console.log(degrees);
      assert.equal(degrees, "-25\u00B0 13\u0027 56.35\u0022");
    });

    it('should return NaN for invalid decimal latitude value', function () {
      var degrees = convert.latDec2Deg(91);
      console.log(degrees);
      assert.equal(isNaN(degrees), true);
    });

  });

  /**
   * Degrees to Decimals
   */
  describe('Degrees to Decimal', function() {

    it('should convert positive degree longitude to decimal longitude', function () {
      var decimal = convert.lonDeg2Dec("25\u00B0 13\u0027 56.35\u0022");
      console.log(decimal);
      assert.equal(decimal, 25.232319);
    });

    it('should convert negative degree longitude to decimal longitude', function () {
      var decimal = convert.lonDeg2Dec("-25\u00B0 13\u0027 56.35\u0022");
      console.log(decimal);
      assert.equal(decimal, -25.232319);
    });

    it('should return NaN for invalid degrees longitude', function () {
      var decimal = convert.lonDeg2Dec("181\u00B0 13\u0027 56.35\u0022");
      console.log(decimal);
      assert.equal(isNaN(decimal), true);
    });

    it('should convert postive degree latitude to decimal longitude', function () {
      var decimal = convert.latDeg2Dec("25\u00B0 13\u0027 56.35\u0022");
      console.log(decimal);
      assert.equal(decimal, 25.232319);
    });

    it('should convert negative degree latitude to decimal longitude', function () {
      var decimal = convert.latDeg2Dec("-25\u00B0 13\u0027 56.35\u0022");
      console.log(decimal);
      assert.equal(decimal, -25.232319);
    });

    it('should return NaN for invalid degrees latitude', function () {
      var decimal = convert.latDeg2Dec("91\u00B0 13\u0027 56.35\u0022");
      console.log(decimal);
      assert.equal(isNaN(decimal), true);
    });

  });
});