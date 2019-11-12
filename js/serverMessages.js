'use strict';

(function () {
  var deactiveState = window.activation.deactiveState;
  var form = document.querySelector('.ad-form');
  var isEscEvent = window.util.isEscEvent;
  // var isEnterEvent = window.util.isEnterEvent;
  var errorMessage = function () {

    var error = document.querySelector('#error')
      .content
      .querySelector('.error');

    deactiveState();
    form.reset();
    var errorTemplate = error.cloneNode(true);
    document.body.appendChild(errorTemplate);


    // var errorButton = errorTemplate.querySelector('.error__button');
    // errorButton.addEventListener('click', function () {
    //   document.removeChild(errorTemplate);
    // });

    document.addEventListener('keydown', isEscEvent(errorTemplate.remove));
  };

  var success = document.querySelector('#success')
    .content
    .querySelector('.success');

  var successMessage = function () {
    deactiveState();
    form.reset();
    var successTemplate = success.cloneNode(true);
    document.body.appendChild(successTemplate);
    document.addEventListener('keydown', isEscEvent(successTemplate.remove));
  };

  window.Message = {
    error: errorMessage,
    success: successMessage,
  };
})();
