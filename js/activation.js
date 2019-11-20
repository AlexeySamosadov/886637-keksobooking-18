'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var controls = document.querySelectorAll('.map__filters input, .map__filters  select, .ad-form fieldset');
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('fieldset');
  var inputAddress = document.querySelector('#address');
  var advertPin = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapCords = map.getBoundingClientRect();
  var mapPinCoordinates = mapPin.getBoundingClientRect();
  var mapPinHalfWidth = (mapPinCoordinates.width / 2);
  var mapPinHeight = mapPinCoordinates.height;
  var pinCoordinates = {
    halfWidth: mapPinHalfWidth,
    height: mapPinHeight,
    X: 603,
    Y: 440
  };

  var findCoordinates = function (elem) {
    var cordyX = Math.round(mapPin.getBoundingClientRect().x - mapCords.left + pinCoordinates.halfWidth);
    var cordyY = Math.round(mapPin.getBoundingClientRect().y + pinCoordinates.height + pageYOffset);
    return elem.setAttribute('value', cordyX + ', ' + cordyY);
  };

  var removeMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPins) {

      mapPins.forEach(function (item) {
        item.remove();
      });
    }
  };

  var fragmentPin = document.createDocumentFragment();
  var activateState = function (apartments) {
    map.classList.remove('map--faded');
    removeMapPins();

    apartments.forEach(function (item) {
      fragmentPin.appendChild(window.addPin(item));
    });

    advertPin.appendChild(fragmentPin);

    addFormFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    addForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    controls.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var deactivateState = function () {
    findCoordinates(inputAddress);
    form.reset();
    mapFilters.reset();
    mapPin.addEventListener('click', window.map.onMouseDown);

    map.classList.add('map--faded');
    removeMapPins();
    addFormFieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });

    mapPin.style.left = pinCoordinates.X - pinCoordinates.halfWidth + 'px';
    mapPin.style.top = pinCoordinates.Y - pinCoordinates.height + 'px';

    addForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');

    controls.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  window.activation = {
    deactivateState: deactivateState,
    activateState: activateState,
    inputAddress: inputAddress,
    mapCords: mapCords,
    findCoordinates: findCoordinates,
    mapPin: mapPin,
    map: map,
    mapPinCoordinates: mapPinCoordinates,
  };
})();
