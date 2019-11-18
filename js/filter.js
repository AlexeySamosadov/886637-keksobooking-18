// Файл filter.js
'use strict';

(function () {
  var activateState = window.activation.activateState;
  var housings = [];
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var checkboxWifi = mapFilters.querySelectorAll('.map__features input');

  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var filteredActivateState = function (data) {
    housings = data;

    updatePins();
  };

  var filterByHousingType = function (item) {
    return housingType.value === item.offer.type || housingType.value === 'any';
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

  var filterByPrice = function (item) {
    return housingPrice.value === transferMoney(item.offer.price) || housingPrice.value === 'any';
  };

  var filterByGuests = function (item) {
    return +housingGuests.value === item.offer.guests || housingGuests.value === 'any';
  };

  var filterByRooms = function (item) {
    return +housingRooms.value === item.offer.rooms || housingRooms.value === 'any';
  };

  var filters = function (item) {
    var feauteresArray = item.offer.features;
    var arr = [];
    arr = Array.from(checkboxWifi).map(function (it) {
      if (it.checked) {
        return it.value;
      }
      return undefined;
    }).filter(function (it) {
      return it !== undefined;
    });
    return arr.every(function (elem) {
      return feauteresArray.indexOf(elem) > -1;
    });
  };


  var updatePins = function () {

    var data = housings.filter(function (item) {
      return filterByHousingType(item) && filterByPrice(item) && filterByGuests(item) && filterByRooms(item) && filters(item);
    }).slice(0, 5);

    activateState(data);
  };

  mapFilters.addEventListener('change', debounce(updatePins));

  window.filter = {
    filteredActivateState: filteredActivateState,
    updatePins: updatePins
  };
})();
