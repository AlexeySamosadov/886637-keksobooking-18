'use strict';

var advertPin = document.querySelector('.map__pins');


var X_PIN = 32;
var Y_PIN = 75;

var mapPin = document.querySelector('.map__pin--main');
var addForm = document.querySelector('.ad-form');
var addFormFieldsets = addForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var inputAdress = document.querySelector('#address');
var numberRoom = document.querySelector('#room_number');
var numberGuest = document.querySelector('#capacity');
var formSubmit = document.querySelector('.ad-form__submit');
var priceNumber = document.querySelector('#price');
var typeNumber = document.querySelector('#type');
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

var findCordination = function (elem) {
  var cordyX = Math.round(mapPin.getBoundingClientRect().x + X_PIN);
  var cordyY = Math.round(mapPin.getBoundingClientRect().y + Y_PIN + pageYOffset);
  return elem.setAttribute('value', cordyX + ', ' + cordyY);
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

var deactiveState = function () {
  for (var i = 0; i < addFormFieldsets.length; i++) {
    addFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
  mapFilters.classList.add('map__filters--disabled');
};

var activateState = function () {
  window.map.classList.remove('map--faded');
  var appartments = window.data.generateArray();
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < appartments.length; i++) {
    fragmentPin.appendChild(window.addPin(appartments[i]));
  }
  advertPin.appendChild(fragmentPin);
  for (i = 0; i < addFormFieldsets.length; i++) {
    addFormFieldsets[i].removeAttribute('disabled', 'disabled');
  }
  addForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  findCordination(inputAdress);
  mapPin.removeEventListener('mousedown', onMouseDown);
};

var onMouseDown = function () {
  activateState();
};

window.closePopup = function () {
  document.querySelector('.popup').remove();
  document.removeEventListener('keydown', window.onClosePopup);
};
window.onClosePopup = function (evt) {
  window.util.isEscEvent(evt, window.closePopup());
};

mapPin.addEventListener('mousedown', onMouseDown);
mapPin.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, activateState());
});
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

deactiveState();
