'use strict';

(function () {
  var map = window.activation.map;
  var mapPin = window.activation.mapPin;
  var inputAdress = window.activation.inputAdress;
  var mapCords = window.activation.mapCords;
  var mapPinCords = window.activation.mapPinCords;
  var mapPinHalfWidth = (mapPinCords.width / 2);
  var mapPinHeight = mapPinCords.height;
  var filteredActivateState = window.filter.filteredActivateState;

  var deactiveState = window.activation.deactiveState;

  var findCordination = window.activation.findCordination;

  var activateState = window.activation.activateState;

  var onMouseDown = function () {
    window.backend.load(activateState, window.Message.error);

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
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    findCordination(inputAdress);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mapPin.addEventListener('click', onMouseDown);
  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.backend.load(filteredActivateState, window.Message.error));
  });

  window.map = {
    map: map,
    onMouseDown: onMouseDown
  };
  deactiveState();
})();
