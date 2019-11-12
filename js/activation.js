'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('fieldset');
  var inputAdress = document.querySelector('#address');
  var advertPin = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapCords = map.getBoundingClientRect();
  var mapPinCords = mapPin.getBoundingClientRect();
  var mapPinHalfWidth = (mapPinCords.width / 2);
  var mapPinHeight = mapPinCords.height;
  var CORD_PIN = {
    X: mapPinHalfWidth,
    Y: mapPinHeight
  };

  var findCordination = function (elem) {
    var cordyX = Math.round(mapPin.getBoundingClientRect().x - mapCords.left + CORD_PIN.X);
    var cordyY = Math.round(mapPin.getBoundingClientRect().y + CORD_PIN.Y + pageYOffset);
    return elem.setAttribute('value', cordyX + ', ' + cordyY);
  };

  var activateState = function (appartments) {
    map.classList.remove('map--faded');
    var fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < appartments.length; i++) {
      fragmentPin.appendChild(window.addPin(appartments[i]));
    }
    advertPin.appendChild(fragmentPin);
    for (i = 0; i < addFormFieldsets.length; i++) {
      addFormFieldsets[i].removeAttribute('disabled', 'disabled');
    }
    addForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    findCordination(inputAdress);
    inputAdress.removeAttribute('disabled');
  };

  var deactiveState = function () {
    map.classList.add('map--faded');
    for (var i = 0; i < addFormFieldsets.length; i++) {
      addFormFieldsets[i].setAttribute('disabled', 'disabled');
    }
    mapFilters.classList.add('map__filters--disabled');
  };

  window.activation = {
    deactiveState: deactiveState,
    activateState: activateState,
    inputAdress: inputAdress,
    mapCords: mapCords,
    findCordination: findCordination,
    mapPin: mapPin,
    map: map,
    mapPinCords: mapPinCords,
  };
})();
