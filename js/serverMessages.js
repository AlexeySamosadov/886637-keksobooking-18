'use strict';

(function () {
  var errorMessage = function () {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    var errorButton = errorTemplate.querySelector('.error__button');

    document.body.appendChild(errorTemplate);

    errorButton.addEventListener('click', function () {
      document.removeChild(errorTemplate);
    });
  };

  var successMessage = function () {
    var successTemplate = document.querySelector('#success').content.cloneNode(true);
    document.body.appendChild(successTemplate);
  };

  window.Message = {
    error: errorMessage,
    success: successMessage
  };
})();
