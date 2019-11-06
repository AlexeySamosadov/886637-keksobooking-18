'use strict';

(function () {
  var map = document.querySelector('.map');
  var advertPin = document.querySelector('.map__pins');
  var mapPin = document.querySelector('.map__pin--main');
  var inputAdress = document.querySelector('#address');
  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var CORD_PIN = {
    X: 32,
    Y: 75
  };

  var findCordination = function (elem) {
    var cordyX = Math.round(mapPin.getBoundingClientRect().x + CORD_PIN.X);
    var cordyY = Math.round(mapPin.getBoundingClientRect().y + CORD_PIN.Y + pageYOffset);
    return elem.setAttribute('value', cordyX + ', ' + cordyY);
  };

  var activateState = function () {
    map.classList.remove('map--faded');
    var appartments = window.data.generateArray();
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
    mapPin.removeEventListener('mousedown', onMouseDown);
  };

  var deactiveState = function () {
    for (var i = 0; i < addFormFieldsets.length; i++) {
      addFormFieldsets[i].setAttribute('disabled', 'disabled');
    }
    mapFilters.classList.add('map__filters--disabled');
  };

  var onMouseDown = function () {
    activateState();
  };

  var onPinHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.top = (mapPin.offsetTop - shift.y) + ' px';
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + ' px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPin.addEventListener('mousedown', onMouseDown);
  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateState());
  });

  mapPin.addEventListener('mousedown', onPinHandler);

  window.map = {
    map: map
  };
  deactiveState();
})();
