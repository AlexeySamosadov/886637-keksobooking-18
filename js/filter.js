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

  window.numberValue = [];
  var updatePins = function () {
    activateState(housings);

    var filteredHousing = housings.filter(function (it) {
      return it.offer.type === window.numberValue[0];
    });

    if (filteredHousing.length === 0) {
      activateState(houseSlice(housings));
    } else {
      activateState(houseSlice(filteredHousing));
    }
  };


  window.filter = {
    filteredActivateState: filteredActivateState,
    updatePins: updatePins
  };
})();
