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

  var typeActive = 0;
  var priceActive = 0;
  var roomsActive = 0;
  var guestsActive = 0;
  var wifiActive = 0;

  var updatePins = function () {

    var sortedPins = housings.slice().sort(function (a, b) {
      var rangDiff = getRang(b) - getRang(a);

      console.log('ранг Дифференc:', rangDiff);
      return rangDiff;
    });

    var maxActiveFilters = typeActive + priceActive + roomsActive + guestsActive + wifiActive;

    console.log('Колличество активных фильтров: ', maxActiveFilters);

    var maxRang = sortedPins[0].offer.rang;
    var filteredHousing = [];

    if (maxRang > 0 && maxRang === maxActiveFilters) {
      filteredHousing = sortedPins.filter(function (it) {
        return it.offer.rang === maxRang;
      });
    }

    console.log('maxRang: ' , maxRang);
    console.log(filteredHousing);

    if (housingTypeValue || housingPriceValue || housingRoomsValue || housingGuestsValue || housingWifiValue) {
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
    if (housingTypeValue === 'any') {
      typeActive = 0;
    } else {
      typeActive = 1;
    }

    console.log('housingTypeValue:', housingTypeValue);
    console.log('typeActive:', typeActive);

    updatePins();
  });
  housingPrice.addEventListener('change', function () {
    housingPriceValue = housingPrice.value;
    if (housingPriceValue === 'any') {
      priceActive = 0;
    } else {
      priceActive = 1;
    }

    console.log('housingPriceValue:', housingPriceValue);
    console.log('priceActive:', priceActive);

    updatePins();
  });
  housingRooms.addEventListener('change', function () {
    housingRoomsValue = +housingRooms.value;
    if (housingRoomsValue >= 0) {
      roomsActive = 1;
    } else {
      roomsActive = 0;
    }

    console.log('housingRoomsValue:', housingRoomsValue);
    console.log('roomsActive:', roomsActive);

    updatePins();
  });
  housingGuests.addEventListener('change', function () {
    housingGuestsValue = +housingGuests.value;
    if (housingGuestsValue >= 0) {
      guestsActive = 1;
    } else {
      guestsActive = 0;
    }
    console.log('housingGuestsValue:', housingGuestsValue);
    console.log('guestsActive:', guestsActive);
    updatePins();
  });

  housingWifi.addEventListener('click', function () {
    housingWifiValue = housingWifi.value;
    if (housingWifiValue = 'wifi') {
      wifiActive = 1;
    } else {
      wifiActive = 0;
    }

    console.log('housingWifi:', housingWifi);
    console.log('housingWifiValue:', housingWifiValue);
    console.log('wifiActive:', wifiActive);

    updatePins();
  });


  window.filter = {
    filteredActivateState: filteredActivateState,
    updatePins: updatePins
  };
})();
