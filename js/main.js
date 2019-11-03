'use strict';

var advertPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapConteiner = map.querySelector('.map__filters-container');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var FlatTypes = {
  FLAT: 'Квартира',
  PALACE: 'Дворец',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

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
  map.classList.remove('map--faded');
  var appartments = window.data.generateArray();
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < appartments.length; i++) {
    fragmentPin.appendChild(addPin(appartments[i]));
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

var addPin = function (appartment) {
  var newPin = templatePin.cloneNode(true);
  newPin.style.left = appartment.location.x + '%';
  newPin.style.top = appartment.location.y + 'px';
  var imagePin = newPin.querySelector('img');
  imagePin.setAttribute('src', appartment.author.avatar);
  imagePin.setAttribute('alt', appartment.offer.title);
  newPin.addEventListener('click', function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
    createNewCards(appartment);
  });
  return newPin;
};

var translateBungaloType = function (bungaloType) {
  return FlatTypes[bungaloType.toUpperCase()];
};

var createNewCards = function (arr) {
  var cardTemple = document.querySelector('#card').content.cloneNode(true);
  var mapCard = cardTemple.querySelector('.map__card');
  var popupTitle = mapCard.querySelector('.popup__title');
  var popupAdress = mapCard.querySelector('.popup__text--address');
  var popupPrice = mapCard.querySelector('.popup__text--price');
  var popupType = mapCard.querySelector('.popup__type');
  var popupCapacity = mapCard.querySelector('.popup__text--capacity');
  var popupTime = mapCard.querySelector('.popup__text--time ');
  var popupFeatures = mapCard.querySelector('.popup__features');
  var popupDescription = mapCard.querySelector('.popup__description');
  var popupPhotos = mapCard.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  var popupAvatar = mapCard.querySelector('.popup__avatar');

  // var newMapCard = mapCard.cloneNode(true);
  popupTitle.textContent = arr.offer.title;
  popupAdress.textContent = arr.offer.address;
  popupPrice.textContent = arr.offer.price + ' ₽/ночь.';
  popupType.textContent = translateBungaloType(arr.offer.type);
  popupCapacity.textContent = arr.offer.rooms + ' Комнаты для ' + arr.offer.guests + ' Гостей';
  popupTime.textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

  popupFeatures.innerHTML = '';
  for (var j = 0; j < arr.offer.features.length; j++) {
    var newList = document.createElement('li');
    newList.classList.add('popup__feature');
    newList.classList.add('popup__feature--' + arr.offer.features[j]);
    popupFeatures.appendChild(newList);
  }
  popupDescription.textContent = arr.offer.description;

  popupPhotos.innerHTML = '';
  for (j = 0; j < arr.offer.photos.length; j++) {
    var newPhoto = popupPhoto.cloneNode(true);
    newPhoto.src = arr.offer.photos[j];
    newPhoto.alt = arr.offer.title;
    popupPhotos.appendChild(newPhoto);
  }

  popupAvatar.src = arr.author.avatar;
  var closeButton = cardTemple.querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    closePopup();
  });
  document.addEventListener('keydown', onClosePopup);
  map.insertBefore(cardTemple, mapConteiner); // Добавляет карточку на страницу
};

var onMouseDown = function () {
  activateState();
};

var closePopup = function () {
  document.querySelector('.popup').remove();
  document.removeEventListener('keydown', onClosePopup);
};
var onClosePopup = function (evt) {
  window.util.isEscEvent(evt, closePopup());
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
