'use strict';

var advertPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentPin = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();
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

var init = function () {
  map.classList.remove('map--faded');
  advertPin.appendChild(fragmentPin);
  map.appendChild(fragmentCard);
};

var randomNumber = function (minNumber, maxNumber) {
  if (arguments.length > 2) {
    return 0;
  } else if (arguments.length === 2) {
    return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
  } else if (arguments.length === 1) {
    return Math.round(Math.random() * minNumber);
  } else {
    return Math.round(Math.random());
  }
};

var generateCordinate = function () {
  return randomNumber(1000) + ', ' + randomNumber(1000);
};

var generateFlat = function () {
  return FLAT_TYPE[randomNumber(4)];
};

var generateRooms = function () {
  return randomNumber(1, 5);
};

var generateGuestNumber = function () {
  return randomNumber(7);
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

var generateMapCordinateX = function () {
  return randomNumber(1, 100);
};

var generateMapCordinateY = function () {
  return randomNumber(130, 630);
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
        'address': generateCordinate(),
        'price': randomNumber(10000),
        'type': generateFlat(),
        'rooms': generateRooms(),
        'guests': generateGuestNumber(),
        'checkin': generateCheckInOutTime(),
        'checkout': generateCheckInOutTime(),
        'features': generateFeatures(featuresTemplate),
        'description': CARDS_DESCRIPTION[i],
        'photos': generatePhotos()
      },

      'location': {
        'x': generateMapCordinateX(),
        'y': generateMapCordinateY()
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
  if (bungaloType === 'flat') {
    bungaloType = 'Квартира';
  } else if (bungaloType === 'bungalo') {
    bungaloType = 'Бунгало';
  } else if (bungaloType === 'house') {
    bungaloType = 'Дом';
  } else if (bungaloType === 'palace') {
    bungaloType = 'Дворец';
  }
  return bungaloType;
};

var createNewCards = function () {
  var cardTemple = document.querySelector('#card').content;
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

  for (var i = 0; i < 8; i++) {
    var newMapCard = mapCard.cloneNode(true);
    popupTitle.textContent = appartments[i].offer.title;
    popupAdress.textContent = appartments[i].offer.address;
    popupPrice.textContent = appartments[i].offer.price + '₽/ночь.';
    popupType.textContent = translateBungaloType(appartments[i].offer.type);
    popupCapacity.textContent = appartments[i].offer.rooms + ' Комнаты для ' + appartments[i].offer.guests + ' Гостей';
    popupTime.textContent = 'Заезд после ' + appartments[i].offer.checkin + ', выезд до ' + appartments[i].offer.checkout;

    popupFeatures.innerHTML = '';
    for (var j = 0; j < appartments[i].offer.features.length; j++) {
      var newList = document.createElement('li');
      newList.classList.add('popup__feature');
      newList.classList.add('popup__feature--' + appartments[i].offer.features[j]);
      popupFeatures.appendChild(newList);
    }
    popupDescription.textContent = appartments[i].offer.description;

    popupPhotos.innerHTML = '';
    for (j = 0; j < appartments[i].offer.photos.length; j++) {
      var newPhoto = popupPhoto.cloneNode(true);
      newPhoto.src = appartments[i].offer.photos[j];
      newPhoto.setAttribute('alt', appartments[i].offer.title);
      popupPhotos.appendChild(newPhoto);
    }

    popupAvatar.src = appartments[i].author.avatar;
    fragmentCard.appendChild(newMapCard);
  }
};
addPin();
createNewCards();
init();

