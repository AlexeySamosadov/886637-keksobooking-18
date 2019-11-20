'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = window.form.element;
  var avatarChooser = form.querySelector('#avatar');
  var preview = form.querySelector('.ad-form-header__preview img');
  var apartmentChooser = form.querySelector('#images');
  var addFormUpload = form.querySelector('.ad-form__upload');


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
    var test = document.querySelector('.ad-form__photo:not(.ad-form__photo--full)');
    if (test) {
      test.remove();
    }

    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    div.classList.add('ad-form__photo--full');
    var image = document.createElement('img');
    image.src = reader.result;
    image.width = 70;
    image.height = 70;
    div.appendChild(image);
    addFormUpload.insertAdjacentElement('afterend', div);
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
