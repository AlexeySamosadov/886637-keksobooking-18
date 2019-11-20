'use strict';

(function () {
  var isEscEvent = window.util.isEscEvent;
  var closePopup;
  var onPopupEscPress = function (evt) {
    isEscEvent(evt, closePopup);
  };
  var onClick = function () {
    closePopup();
    document.removeEventListener('click', onClick);
  };

  var resetImages = function () {
    var photoContainer = document.querySelector('.ad-form__photo-container');
    var formPhotos = document.querySelectorAll('.ad-form__photo');
    var formPhotoImages = document.querySelectorAll('.ad-form__photo img');
    var avatarPhoto = document.querySelector('.ad-form-header__preview img');
    avatarPhoto.src = 'img/muffin-grey.svg';

    if (formPhotoImages.length >= 1) {
      formPhotos.forEach(function (it) {
        it.remove();
      });
      var imageContainer = document.createElement('div');
      imageContainer.classList.add('ad-form__photo');
      photoContainer.appendChild(imageContainer);
    }
  };

  var errorMessage = function () {
    var error = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorTemplate = error.cloneNode(true);
    document.body.appendChild(errorTemplate);
    var errorButton = errorTemplate.querySelector('.error__button');
    resetImages();
    closePopup = function () {
      errorTemplate.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    };

    window.activation.deactivateState();

    document.addEventListener('keydown', onPopupEscPress);
    errorButton.addEventListener('click', onClick);
    document.addEventListener('click', onClick);
  };

  var successMessage = function () {
    var success = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successTemplate = success.cloneNode(true);
    resetImages();

    closePopup = function () {
      successTemplate.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    };

    window.activation.deactivateState();

    document.body.appendChild(successTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onClick);
  };

  window.message = {
    error: errorMessage,
    success: successMessage,
  };
})();
