'use strict';

(function () {
  var formSubmit = document.querySelector('.ad-form__submit');
  var priceNumber = document.querySelector('#price');
  var typeNumber = document.querySelector('#type');
  var numberRoom = document.querySelector('#room_number');
  var numberGuest = document.querySelector('#capacity');
  var numberRoomValue = +numberRoom.value;
  var numberGuestValue = +numberGuest.value;
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

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
})();
