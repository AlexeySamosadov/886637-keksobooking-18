'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.addPin = function (appartment) {
    var newPin = templatePin.cloneNode(true);
    newPin.style.left = appartment.location.x + 'px';
    newPin.style.top = appartment.location.y + 'px';
    var imagePin = newPin.querySelector('img');
    imagePin.setAttribute('src', appartment.author.avatar);
    imagePin.setAttribute('alt', appartment.offer.title);
    newPin.addEventListener('click', function () {
      if (document.querySelector('.popup')) {
        document.querySelector('.popup').remove();
      }
      window.createNewCards(appartment);
    });
    return newPin;
  };
})();
