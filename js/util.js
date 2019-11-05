'use strict';

(function () {
  var BUTTON_NUMBER = {
    ENTER: 13,
    ESC: 27
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === BUTTON_NUMBER.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === BUTTON_NUMBER.ENTER) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
