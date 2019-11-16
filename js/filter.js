// Файл filter.js
'use strict';

(function () {
  var activateState = window.activation.activateState;
  var housings = [];
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingRooms = mapFilters.querySelector('#housing-rooms');

  var filteredActivateState = function (data) {
    housings = data;

    updatePins();
  };

  var filterByHousingType = function (item) {
    return housingType.value === item.offer.type || housingType.value === 'any';
  };

  var filterByGuests = function (item) {
    return +housingGuests.value === item.offer.guests || housingGuests.value === 'any';
  };

  var filterByRooms = function (item) {
    return +housingRooms.value === item.offer.rooms || housingRooms.value === 'any';
  };

  var updatePins = function () {

    var data = housings.filter(function (item) {
      return filterByHousingType(item) && filterByGuests(item) && filterByRooms(item);
    }).slice(0, 5);

    activateState(data);
  };

  mapFilters.addEventListener('change', updatePins);

  window.filter = {
    filteredActivateState: filteredActivateState,
    updatePins: updatePins
  };
})();
