'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = window.form.element;
  var avatarChooser = form.querySelector('#avatar');
  var preview = form.querySelector('.ad-form-header__preview img');

  var apartmentChooser = form.querySelector('#images');
  var formPhoto = form.querySelector('.ad-form__photo');
  var formPhotoContainer = form.querySelector('.ad-form__photo-container');


  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  var reader;
  var onLoad = function () {
    formPhoto.remove();
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    var image = document.createElement('img');
    image.src = reader.result;
    image.width = 70;
    image.height = 70;
    div.appendChild(image);
    formPhotoContainer.appendChild(div);
  };

  apartmentChooser.addEventListener('change', function () {
    var files = Array.from(apartmentChooser.files);

    files.forEach(function (item) {
      var file = item;

      if (file) {
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          reader = new FileReader();

          reader.addEventListener('load', onLoad);

          reader.readAsDataURL(file);
        }
      }
    });
  });
})();
