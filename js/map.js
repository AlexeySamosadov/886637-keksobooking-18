'use strict';

(function () {
  var map = document.querySelector('.map');
  var advertPin = document.querySelector('.map__pins');
  var mapPin = document.querySelector('.map__pin--main');
  var inputAdress = document.querySelector('#address');
  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('fieldset');
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
  };

  var deactiveState = function () {
    map.classList.add('map--faded');
    for (var i = 0; i < addFormFieldsets.length; i++) {
      addFormFieldsets[i].setAttribute('disabled', 'disabled');
    }
    mapFilters.classList.add('map__filters--disabled');
  };

  var onMouseDown = function () {
    window.backend.load(activateState, window.Message.error);

    mapPin.removeEventListener('click', onMouseDown);
    mapPin.addEventListener('mousedown', onPinHandler);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var left = moveEvt.pageX - mapCords.left - mapPinHalfWidth;
    var top = moveEvt.pageY - (mapPinHeight * 1.25);

    var limitedLeft = Math.min(mapCords.width - mapPinHalfWidth, Math.max(mapPinHalfWidth * (-1), left));
    var limitedTop = Math.min(630 - mapPinHeight, Math.max(130 - mapPinHeight, top));

    mapPin.style.left = limitedLeft + 'px';
    mapPin.style.top = limitedTop + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    findCordination(inputAdress);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onPinHandler = function (evt) {
    evt.preventDefault();
    mapCords = map.getBoundingClientRect();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPin.addEventListener('click', onMouseDown);
  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.backend.load(activateState, window.Message.error));
  });

  window.deactiveState = deactiveState;
  window.map = {
    map: map,
    deactiveState: deactiveState
  };
  deactiveState();
})();
