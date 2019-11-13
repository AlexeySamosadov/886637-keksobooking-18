'use strict';

(function () {
  var deactiveState = window.activation.deactiveState;
  var isEscEvent = window.util.isEscEvent;
  var onMouseDown = window.map.onMouseDown;
  var mapPin = window.activation.mapPin;
  var closePopup;
  var onPopupEscPress = function (evt) {
    isEscEvent(evt, closePopup);
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var onClick = function () {
    closePopup();
    document.removeEventListener('click', onClick);
  };

  var errorMessage = function () {
    var error = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorTemplate = error.cloneNode(true);
    document.body.appendChild(errorTemplate);
    var errorButton = errorTemplate.querySelector('.error__button');
    closePopup = function () {
      errorTemplate.remove();
    };

    deactiveState();
    mapPin.addEventListener('click', onMouseDown);

    document.addEventListener('keydown', onPopupEscPress);
    errorButton.addEventListener('click', onClick);
    document.addEventListener('click', onClick);
  };

  var successMessage = function () {
    var success = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successTemplate = success.cloneNode(true);
    closePopup = function () {
      successTemplate.remove();
    };

    deactiveState();
    mapPin.addEventListener('click', onMouseDown);

    document.body.appendChild(successTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onClick);
  };

  window.Message = {
    error: errorMessage,
    success: successMessage,
  };
})();
