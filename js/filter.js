// Файл filter.js
'use strict';

(function () {
  var activateState = window.activation.activateState;

  var filteredActivateState = function (data) {
    activateState(data);
  };

  window.filter = {
    filteredActivateState: filteredActivateState
  };
})();
