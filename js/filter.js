// Файл filter.js
'use strict';

(function () {
  var activateState = window.activation.activateState;
  var housings = [];
  var mapFilter = document.querySelector('.map__filters');
  var housingType = mapFilter.querySelector('#housing-type');
  var housingGuests = mapFilter.querySelector('#housing-guests');
  var housingRooms = mapFilter.querySelector('#housing-rooms');

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

  mapFilter.addEventListener('change', updatePins);

  window.filter = {
    filteredActivateState: filteredActivateState,
    updatePins: updatePins
  };
})();
