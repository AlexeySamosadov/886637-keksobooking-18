'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formSubmit = document.querySelector('.ad-form__submit');
  var priceNumber = document.querySelector('#price');
  var typeNumber = document.querySelector('#type');
  var inputAddress = document.querySelector('#address');
  var numberRoom = document.querySelector('#room_number');
  var numberGuest = document.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var successMessage = window.message.success;
  var errorMessage = window.message.error;

  var HousingTypes = {
    FLAT: 1000,
    PALACE: 10000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var changePlaceholderAndMinValue = function () {
    priceNumber.setAttribute('placeholder', HousingTypes[typeNumber.value.toUpperCase()]);
    priceNumber.setAttribute('min', HousingTypes[typeNumber.value.toUpperCase()]);
  };

  var onErrorRoomGuest = function () {
    var numberRoomValue = parseInt(numberRoom.value, 10);
    var numberGuestValue = parseInt(numberGuest.value, 10);
    numberRoom.setCustomValidity('');
    numberGuest.setCustomValidity('');
    if ((numberRoomValue === 100 && numberGuestValue !== 0) || (numberRoomValue !== 100 && numberGuestValue === 0)) {
      numberRoom.setCustomValidity('Количество комнат не соответсвует количеству гостей');
    } else if (numberRoomValue < numberGuestValue) {
      numberRoom.setCustomValidity('Количество комнат не соответсвует количеству гостей');
    }
  };

  numberRoom.addEventListener('change', onErrorRoomGuest);
  numberGuest.addEventListener('change', onErrorRoomGuest);
  formSubmit.addEventListener('click', onErrorRoomGuest);

  typeNumber.addEventListener('change', function () {
    changePlaceholderAndMinValue();
  });
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    inputAddress.removeAttribute('disabled');
    window.backend.save(new FormData(form), successMessage, errorMessage);
  });

  window.form = {
    element: form
  };
})();
