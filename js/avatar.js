'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = window.form.element;
  var avatarChooser = form.querySelector('#avatar');
  var preview = form.querySelector('.ad-form-header__preview img');

  var appartmentChoser = form.querySelector('#images');
  var formPhoto = form.querySelector('.ad-form__photo');


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

  // var imageFragment = document.createDocumentFragment();

  appartmentChoser.addEventListener('change', function () {
    // appartmentChoser.files.forEach(function (item) {  var file = item;   Тут как то не понимаю как запустить в цикле загрузку нескольких фото - по одному загрузка работает можно загружать несколько фото по очеререди.

    var file = appartmentChoser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var image = document.createElement('img');
          image.src = reader.result;
          image.width = 70;
          image.height = 70;
          // imageFragment.appendChild(image);
          formPhoto.appendChild(image);
        });

        reader.readAsDataURL(file);
      }
    }

  });
  // });
})();
