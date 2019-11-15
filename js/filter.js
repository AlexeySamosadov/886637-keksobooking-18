// Файл filter.js
'use strict';

(function () {
  var activateState = window.activation.activateState;
  var housings = [];

  var filteredActivateState = function (data) {
    housings = data;

    updatePins();
  };

  var houseSlice = function (arr) {
    if (arr.length > 5) {
      arr = arr.slice(5);
    }
    return arr;
  };

  var housingTypeValue;
  var updatePins = function () {
    activateState(housings);

    var filteredHousing = housings.filter(function (it) {
      return it.offer.type === housingTypeValue;
    });

    if (filteredHousing.length === 0) {
      activateState(houseSlice(housings));
    } else {
      activateState(houseSlice(filteredHousing));
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
