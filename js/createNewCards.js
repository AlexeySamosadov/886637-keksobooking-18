'use strict';

(function () {
  var mapContainer = window.map.element.querySelector('.map__filters-container');
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
    window.util.isEscEvent(evt, closePopup);
  };

  window.createNewCards = function (arr) {
    var cardTemplate = document.querySelector('#card').content.cloneNode(true);
    var mapCard = cardTemplate.querySelector('.map__card');
    var popupTitle = mapCard.querySelector('.popup__title');
    var popupAddress = mapCard.querySelector('.popup__text--address');
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
    popupAddress.textContent = arr.offer.address;
    popupPrice.textContent = arr.offer.price + ' ₽/ночь.';
    popupType.textContent = translateBungaloType(arr.offer.type);
    popupCapacity.textContent = arr.offer.rooms + ' Комнаты для ' + arr.offer.guests + ' Гостей';
    popupTime.textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

    popupFeatures.innerHTML = '';
    var fragment = document.createDocumentFragment();

    arr.offer.features.forEach(function (item) {
      var newList = document.createElement('li');
      newList.classList.add('popup__feature');
      newList.classList.add('popup__feature--' + item);
      fragment.appendChild(newList);
    });
    popupFeatures.appendChild(fragment);
    popupDescription.textContent = arr.offer.description;

    popupPhotos.innerHTML = '';

    arr.offer.photos.forEach(function (item) {
      var newPhoto = popupPhoto.cloneNode(true);
      newPhoto.src = item;
      newPhoto.alt = arr.offer.title;
      popupPhotos.appendChild(newPhoto);
    });

    popupAvatar.src = arr.author.avatar;
    var closeButton = cardTemplate.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onClosePopup);

    var mapFilter = document.querySelector('.map__filters');
    mapFilter.addEventListener('change', closePopup);
    window.map.element.insertBefore(cardTemplate, mapContainer); // Добавляет карточку на страницу
  };
})();
