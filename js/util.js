'use strict';

(function () {
  var ButtonNumber = {
    ENTER: 13,
    ESC: 27
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ButtonNumber.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ButtonNumber.ENTER) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
