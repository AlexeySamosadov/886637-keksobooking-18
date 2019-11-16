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
  var housingPriceValue;
  var housingRoomsValue;
  var housingGuestsValue;
  var housingWifiValue;

  var getRang = function (element) {
    var rang = 0;
    element.offer.rang = 0;
    if (element.offer.type === housingTypeValue) {
      rang += 1;
      element.offer.rang += 1;
    }
    if (transferMoney(element.offer.price) === housingPriceValue) {
      rang += 1;
      element.offer.rang += 1;
    }
    if (element.offer.rooms === housingRoomsValue) {
      rang += 1;
      element.offer.rang += 1;
    }
    if (element.offer.guests === housingGuestsValue) {
      rang += 1;
      element.offer.rang += 1;
    }

    // var test = function (, ) {
    //
    // }
    var wifi = (element.offer.features)
      .filter(function (it) {
        return it === housingWifiValue;
      });

    if (wifi.length === 1) {
      rang += 1;
      element.offer.rang += 1;
    }
    return rang;
  };

  var transferMoney = function (elem) {
    if (elem < 10000) {
      return 'low';
    } else if (elem >= 10000 && elem < 50000) {
      return 'middle';
    } else {
      return 'high';
    }
  };

  var updatePins = function () {

    var sortedPins = housings.slice().sort(function (a, b) {
      var rangDiff = getRang(b) - getRang(a);

      console.log('ранг Дифференc:', rangDiff);
      return rangDiff;
    });
    var maxRang = sortedPins[0].offer.rang;

    var filteredHousing = sortedPins.filter(function (it) {
      return it.offer.rang === maxRang;
    });
    console.log(maxRang);
    console.log(sortedPins);

    if (filteredHousing) {
      activateState(houseSlice(filteredHousing));
    } else {
      activateState(houseSlice(housings));
    }


    // var filteredHousing = housings
    //   .filter(function (it) {
    //     return it.offer.type === housingTypeValue;
    //   })
    //   .concat(housings.filter(function (it) {
    //     return it.offer.price === housingPriceValue;
    //   }));


    // if (housingTypeValue) {
    //   activateState(houseSlice(filteredHousing));
    // } else {
    //   activateState(houseSlice(housings));
    // }
  };

  var mapFilter = document.querySelector('.map__filters');
  var housingType = mapFilter.querySelector('#housing-type');
  var housingPrice = mapFilter.querySelector('#housing-price');
  var housingRooms = mapFilter.querySelector('#housing-rooms');
  var housingGuests = mapFilter.querySelector('#housing-guests');

  var housingWifi = mapFilter.querySelector('#filter-wifi');

  housingType.addEventListener('change', function () {
    housingTypeValue = housingType.value;
    updatePins();
  });
  housingPrice.addEventListener('change', function () {
    housingPriceValue = housingPrice.value;
    updatePins();
  });
  housingRooms.addEventListener('change', function () {
    housingRoomsValue = +housingRooms.value;
    updatePins();
  });
  housingGuests.addEventListener('change', function () {
    housingGuestsValue = +housingGuests.value;
    updatePins();
  });

  housingWifi.addEventListener('change', function () {
    housingWifiValue = housingWifi.value;
    updatePins();
  });


  window.filter = {
    filteredActivateState: filteredActivateState,
    updatePins: updatePins
  };
})();
