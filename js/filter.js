// Файл filter.js
'use strict';

(function () {
  var activateState = window.activation.activateState;
  var housings = [];

  var filteredActivateState = function (data) {
    housings = data;

    updatePins();
  };

  var MAX_PINS_ON_MAP = 5;
  var houseSlice = function (arr) {
    if (arr.length > MAX_PINS_ON_MAP) {
      arr = arr.slice(MAX_PINS_ON_MAP);
    }
    return arr;
  };

  var housingTypeValue;
  var updatePins = function () {
    activateState(housings);

    var filteredHousing = housings.filter(function (it) {
      return it.offer.type === housingTypeValue;
    });

    if (housingTypeValue) {
      activateState(houseSlice(filteredHousing));
    } else {
      activateState(houseSlice(housings));
    }
  };

  var mapFilter = document.querySelector('.map__filters');
  var housingType = mapFilter.querySelector('#housing-type');

  housingType.addEventListener('change', function () {
    housingTypeValue = housingType.value;
    updatePins();
  });

  window.filter = {
    filteredActivateState: filteredActivateState,
    updatePins: updatePins
  };
})();
