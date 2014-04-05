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

