(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gaslaw = require('gas-density-calculator');
var archimedes = require('archimedes-principle');

var getDensity = function(mw) {
  return gaslaw.getDensity({
    molecularWeightGramMole: mw,
    temperatureKelvin: $('#ambient-temperature').val(),
    pressureKiloPascal: $('#ambient-pressure').val()
  });
}

$(function() {
  $('input').on('keyup', function() {
    var densityHelium = getDensity(4.002602);
    var densityAir = getDensity(28.97);

    var volume = archimedes.minVolumeForBouyancy({
      fluidDensity: densityAir,
      objectDensity: densityHelium,
      mass: $('#mass').val()
    });
    $('#volume').val(Math.ceil(volume * 264.17));
  }).keyup();
});


},{"archimedes-principle":2,"gas-density-calculator":3}],2:[function(require,module,exports){
module.exports = {

  /* Use Archimedes' principle
   * to determine the minimum volume required
   * in order for an object of a given mass and density
   * to achieve bouyancy within a fluid of a given density
   */
  minVolumeForBouyancy: function(options) {
    var fd = options.fluidDensity,
        od = options.objectDensity,
        M = options.mass;
    var V = M / (fd - od);

    return V;
  }
}


},{}],3:[function(require,module,exports){

module.exports = {

  /* Use the ideal gas law
   * ρ = (P * M.W.) / (R * T)
   */
  getDensity: function(options) {
    var R = 8.3144621,
        MW = options.molecularWeightGramMole,
        P = options.pressureKiloPascal,
        T = options.temperatureKelvin;
    var ρ = (P * MW) / (R * T);

    return ρ;
  }
}

},{}]},{},[1])