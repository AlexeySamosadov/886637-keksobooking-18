'use strict';

(function () {
  var isEscEvent = window.util.isEscEvent;
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

    window.activation.deactiveState();

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

    window.activation.deactiveState();

    document.body.appendChild(successTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onClick);
  };

  window.Message = {
    error: errorMessage,
    success: successMessage,
  };
})();
