'use strict';

var advertPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapConteiner = map.querySelector('.map__filters-container');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentPin = document.createDocumentFragment();
var featuresTemplate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CARD_TITLES = ['Новая квартира около метро', 'Ретро квартира', 'Современная квартира Аригато', 'Уютная комната в центре Токио', 'Новый евроремонт', 'Отель с видом на Башню', 'Комната у парка', 'Эксклюзивный Пент-Хаус'];
var CARDS_DESCRIPTION = [
  'Уютная квартира рядом с прекрасным парком, в шаговой доступности от метро Щукинская, рядом торговый центр',
  'Светлая элегантная квартира в самом центре Москвы, на оживленном бульваре',
  'Предлагаются посуточно апартаменты - студия с хорошим ремонтом.\n' + 'Полный набор техники.',
  'Красивые и комфортные номера в самом центре Москвы',
  'От квартиры до метро ~8 минут средним шагом.',
  'Апартамент с дизайнерским ремонтом рядом с метро. В комнате двуспальная кровать с ортопедическим матрасом, гардероб, туалетный столик, стул. Техника новая - кондиционер, телевизор, холодильник, СВЧ-печь (микроволновая), электрический чайник, утюг, гладильная доска, встроенный фен. Чайный набор, посуда. Многофункциональная душевая кабина с гидромассажем, туалетные принадлежности (жидкое мыло, гель для душа, шампунь и кондиционер). Комплект постельного белья и полотенец. Бесплатный Wi-Fi.',
  'Стильная, современная и очень теплая квартира рядом с Киевским вокзалом. Дом находится во дворе, что обеспечивает тишину. Квартира - студия, в ней есть всё необходимое для комфортного проживания.'
];
var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ENTER_BUTTON_NUMBER = 13;
var FlatTypes = {
  FLAT: 'Квартира',
  PALACE: 'Дворец',
  HOUSE: 'Дом',
  FFF: 'Бунгало'
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


var findCordination = function (elem) {
  var cordyX = Math.round(mapPin.getBoundingClientRect().x + X_PIN);
  var cordyY = Math.round(mapPin.getBoundingClientRect().y + Y_PIN + pageYOffset);
  return elem.setAttribute('value', cordyX + ', ' + cordyY);
};

var onErrorRoomGuest = function () {
  numberRoom.setCustomValidity('');
  numberGuest.setCustomValidity('');
  if ((+numberRoom.value === 100 && +numberGuest.value !== 0) || (+numberRoom.value !== 100 && +numberGuest.value === 0)) {
    numberRoom.setCustomValidity('Мало комнат');
    numberGuest.setCustomValidity('Много людей');
  } else if (+numberRoom.value < +numberGuest.value) {
    numberRoom.setCustomValidity('Мало комнат');
    numberGuest.setCustomValidity('Много людей');
  }
};

var notActiveState = function () {
  for (var i = 0; i < addFormFieldsets.length; i++) {
    addFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
  mapFilters.classList.add('map__filters--disabled');
};

var activeState = function () {
  map.classList.remove('map--faded');
  addPin();
  advertPin.appendChild(fragmentPin);
  map.insertBefore(createNewCards(appartments[1]), mapConteiner); // Добавляет карточку на страницу
  for (var i = 0; i < addFormFieldsets.length; i++) {
    addFormFieldsets[i].removeAttribute('disabled', 'disabled');
  }
  addForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  findCordination(inputAdress);
};

var randomNumber = function (minNumber, maxNumber) {
  if (arguments.length > 2) {
    return 0;
  } else if (arguments.length === 2) {
    return Math.ceil(Math.random() * (maxNumber - minNumber) + minNumber);
  } else if (arguments.length === 1) {
    return Math.round(Math.random() * minNumber);
  } else {
    return Math.round(Math.random());
  }
};

var generateCheckInOutTime = function () {
  var checkInTimes = ['12:00', '13:00', '14:00'];
  return checkInTimes[randomNumber(2)];
};

var generateFeatures = function (features) {
  var arrayLength = randomNumber(features.length - 1);
  var generatedFeatures = [];

  for (var i = 0; i < arrayLength; i++) {
    generatedFeatures.push(features[i]);
  }

  return generatedFeatures;
};

var generatePhotos = function () {
  var arrayLength = randomNumber(1, 4);
  var generatedPhotos = [];

  for (var i = 1; i < arrayLength; i++) {
    generatedPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }

  return generatedPhotos;
};

var generateArray = function () {
  var arr = [];

  for (var i = 0; i < 8; i++) {
    var cardTemplate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': CARD_TITLES[i],
        'address': randomNumber(1000) + ', ' + randomNumber(1000),
        'price': randomNumber(10000),
        'type': FLAT_TYPE[randomNumber(4)],
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(7),
        'checkin': generateCheckInOutTime(),
        'checkout': generateCheckInOutTime(),
        'features': generateFeatures(featuresTemplate),
        'description': CARDS_DESCRIPTION[i],
        'photos': generatePhotos()
      },

      'location': {
        'x': randomNumber(1, 100),
        'y': randomNumber(130, 630)
      }
    };
    arr.push(cardTemplate);
  }

  return arr;
};

var appartments = generateArray();

var addPin = function () {
  for (var i = 0; i < 8; i++) {
    var newPin = templatePin.cloneNode(true);
    newPin.style.left = appartments[i].location.x + '%';
    newPin.style.top = appartments[i].location.y + 'px';
    var imagePin = newPin.querySelector('img');
    imagePin.setAttribute('src', appartments[i].author.avatar);
    imagePin.setAttribute('alt', appartments[i].offer.title);
    fragmentPin.appendChild(newPin);
  }
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
  popupPrice.textContent = arr.offer.price + '₽/ночь.';
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
  return cardTemple;
};

mapPin.addEventListener('mousedown', function () {
  activeState();
});
mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON_NUMBER) {
    activeState();
  }
});

numberRoom.addEventListener('change', onErrorRoomGuest);
numberGuest.addEventListener('change', onErrorRoomGuest);
formSubmit.addEventListener('click', onErrorRoomGuest); // Почему тут обрабочик на событие Submit не работает?

notActiveState();
