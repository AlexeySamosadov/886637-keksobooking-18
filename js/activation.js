'use strict';

(function () {
  var form = document.querySelector('.ad-form');
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
  var CordPin = {
    halfWidth: mapPinHalfWidth,
    height: mapPinHeight,
    X: 603,
    Y: 440
  };

  var findCordination = function (elem) {
    var cordyX = Math.round(mapPin.getBoundingClientRect().x - mapCords.left + CordPin.halfWidth);
    var cordyY = Math.round(mapPin.getBoundingClientRect().y + CordPin.height + pageYOffset);
    return elem.setAttribute('value', cordyX + ', ' + cordyY);
  };

  var removeMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPins) {
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].remove();
      }
    }
  };

  var fragmentPin = document.createDocumentFragment();
  var activateState = function (appartments) {
    map.classList.remove('map--faded');
    removeMapPins();

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
  };

  var deactiveState = function () {
    form.reset();
    mapPin.addEventListener('click', window.map.onMouseDown);

    map.classList.add('map--faded');
    removeMapPins();
    for (var i = 0; i < addFormFieldsets.length; i++) {
      addFormFieldsets[i].setAttribute('disabled', 'disabled');
    }

    mapPin.style.left = CordPin.X - CordPin.halfWidth + 'px';
    mapPin.style.top = CordPin.Y - CordPin.height + 'px';

    addForm.classList.add('ad-form--disabled');
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
