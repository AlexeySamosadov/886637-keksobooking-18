'use strict';

(function () {
  var map = window.activation.map;
  var mapPin = window.activation.mapPin;
  var inputAddress = window.activation.inputAddress;
  var mapCords = window.activation.mapCords;
  var mapPinCordinates = window.activation.mapPinCordinates;
  var mapPinHalfWidth = (mapPinCordinates.width / 2);
  var mapPinHeight = mapPinCordinates.height;
  var filteredActivateState = window.filter.filteredActivateState;

  var deactivateState = window.activation.deactivateState;

  var findCoordinates = window.activation.findCoordinates;

  // var activateState = window.activation.activateState;

  var onMouseDown = function () {
    window.backend.load(filteredActivateState, window.message.error);

    mapPin.removeEventListener('click', onMouseDown);
    mapPin.addEventListener('mousedown', onPinHandler);
  };

  var onPinHandler = function (evt) {
    evt.preventDefault();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var left = moveEvt.pageX - mapCords.left - mapPinHalfWidth;
    var top = moveEvt.pageY - (mapPinHeight * 1.25);

    var limitedLeft = Math.min(mapCords.width - mapPinHalfWidth, Math.max(mapPinHalfWidth * (-1), left));
    var limitedTop = Math.min(630 - mapPinHeight, Math.max(130 - mapPinHeight, top));

    mapPin.style.left = limitedLeft + 'px';
    mapPin.style.top = limitedTop + 'px';
    findCoordinates(inputAddress);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mapPin.addEventListener('click', onMouseDown);
  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.backend.load(filteredActivateState, window.message.error));
  });

  window.map = {
    element: map,
    onMouseDown: onMouseDown
  };
  deactivateState();
})();
