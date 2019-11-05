'use strict';

(function () {
  var CARDS_DESCRIPTION = [
    'Уютная квартира рядом с прекрасным парком, в шаговой доступности от метро Щукинская, рядом торговый центр',
    'Светлая элегантная квартира в самом центре Москвы, на оживленном бульваре',
    'Предлагаются посуточно апартаменты - студия с хорошим ремонтом.\n' + 'Полный набор техники.',
    'Красивые и комфортные номера в самом центре Москвы',
    'От квартиры до метро ~8 минут средним шагом.',
    'Апартамент с дизайнерским ремонтом рядом с метро. В комнате двуспальная кровать с ортопедическим матрасом, гардероб, туалетный столик, стул. Техника новая - кондиционер, телевизор, холодильник, СВЧ-печь (микроволновая), электрический чайник, утюг, гладильная доска, встроенный фен. Чайный набор, посуда. Многофункциональная душевая кабина с гидромассажем, туалетные принадлежности (жидкое мыло, гель для душа, шампунь и кондиционер). Комплект постельного белья и полотенец. Бесплатный Wi-Fi.',
    'Стильная, современная и очень теплая квартира рядом с Киевским вокзалом. Дом находится во дворе, что обеспечивает тишину. Квартира - студия, в ней есть всё необходимое для комфортного проживания.'
  ];
  var CARD_TITLES = ['Новая квартира около метро', 'Ретро квартира', 'Современная квартира Аригато', 'Уютная комната в центре Токио', 'Новый евроремонт', 'Отель с видом на Башню', 'Комната у парка', 'Эксклюзивный Пент-Хаус'];
  var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var featuresTemplate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
          'type': FLAT_TYPE[randomNumber(3)],
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

  window.data = {
    generateArray: generateArray
  };
})();
