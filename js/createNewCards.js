'use strict';

(function () {
  var mapConteiner = window.map.querySelector('.map__filters-container');
  var FlatTypes = {
    FLAT: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var translateBungaloType = function (bungaloType) {
    return FlatTypes[bungaloType.toUpperCase()];
  };

  var closePopup = function () {
    document.querySelector('.popup').remove();
    document.removeEventListener('keydown', onClosePopup);
  };
  var onClosePopup = function (evt) {
    window.util.isEscEvent(evt, closePopup());
  };

  window.createNewCards = function (arr) {
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
    window.map.insertBefore(cardTemple, mapConteiner); // Добавляет карточку на страницу
  };
})();
