'use strict';

var advertPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentPin = document.createDocumentFragment();

var generateCordinate = function () {
  return Math.round(Math.random() * 1000) + ', ' + Math.round(Math.random() * 1000);
};

var generatePrice = function () {
  return Math.round(Math.random() * 10000);
};

var cardTitles = ['Новая квартира около метро', 'Ретро квартира', 'Современная квартира Аригато', 'Уютная комната в центре Токио', 'Новый евроремонт', 'Отель с видом на Башню', 'Комната у парка', 'Эксклюзивный Пент-Хаус'];
var cardsDiscription = [
  'Уютная квартира рядом с прекрасным парком, в шаговой доступности от метро Щукинская, рядом торговый центр',
  'Светлая элегантная квартира в самом центре Москвы, на оживленном бульваре',
  'Предлагаются посуточно апартаменты - студия с хорошим ремонтом.\n' + 'Полный набор техники.',
  'Красивые и комфортные номера в самом центре Москвы',
  'От квартиры до метро ~8 минут средним шагом.',
  'Апартамент с дизайнерским ремонтом рядом с метро. В комнате двуспальная кровать с ортопедическим матрасом, гардероб, туалетный столик, стул. Техника новая - кондиционер, телевизор, холодильник, СВЧ-печь (микроволновая), электрический чайник, утюг, гладильная доска, встроенный фен. Чайный набор, посуда. Многофункциональная душевая кабина с гидромассажем, туалетные принадлежности (жидкое мыло, гель для душа, шампунь и кондиционер). Комплект постельного белья и полотенец. Бесплатный Wi-Fi.',
  'Стильная, современная и очень теплая квартира рядом с Киевским вокзалом. Дом находится во дворе, что обеспечивает тишину. Квартира - студия, в ней есть всё необходимое для комфортного проживания.'
];


var generateFlat = function () {
  var flatType = ['palace', 'flat', 'house', 'bungalo'];
  return flatType[Math.round(Math.random() * 4)];
};

var generateRooms = function () {
  return Math.round(Math.random() * 4 + 1);
};

var generateGuestNumber = function () {
  return Math.round(Math.random() * 7);
};

var generateCheckInOutTime = function () {
  var checkInTimes = ['12:00', '13:00', '14:00'];
  return checkInTimes[Math.round(Math.random() * 2)];
};

var generateFeatures = function () {
  var featuresTemplate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var arrayLength = Math.round(Math.random() * 5);
  var generatedFeatures = [];

  for (var i = 0; i < arrayLength; i++) {
    generatedFeatures[i] = featuresTemplate[i];
  }

  return generatedFeatures;
};

var generatePhotos = function () {
  var arrayLength = Math.round(Math.random() * 15);
  var generatedPhotos = [];

  for (var i = 0; i < arrayLength; i++) {
    generatedPhotos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg';
  }

  return generatedPhotos;
};

var generateMapCordinateX = function () {
  return Math.round(Math.random() * 99 + 1);
};

var generateMapCordinateY = function () {
  return Math.round(Math.random() * 500 + 130);
};

var generateArray = function () {
  var arr = [];

  for (var i = 0; i < 8; i++) {
    var cardTemplate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': cardTitles[i],
        'address': generateCordinate(),
        'price': generatePrice(),
        'type': generateFlat(),
        'rooms': generateRooms(),
        'guests': generateGuestNumber(),
        'checkin': generateCheckInOutTime(),
        'checkout': generateCheckInOutTime(),
        'features': generateFeatures(),
        'description': cardsDiscription[i],
        'photos': generatePhotos()
      },

      'location': {
        'x': generateMapCordinateX(),
        'y': generateMapCordinateY()
      }
    };
    arr[i] = cardTemplate;
  }

  return arr;
};

var appartments = generateArray();

for (var i = 0; i < 8; i++) {
  var newPin = templatePin.cloneNode(true);
  newPin.setAttribute('style', 'left: ' + appartments[i].location.x + '%; ' + 'top: ' + appartments[i].location.y + 'px;');
  var imagePin = newPin.querySelector('img');
  imagePin.setAttribute('src', appartments[i].author.avatar);
  imagePin.setAttribute('alt', appartments[i].offer.title);

  fragmentPin.appendChild(newPin);
}

advertPin.appendChild(fragmentPin);


