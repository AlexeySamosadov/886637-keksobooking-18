// Файл backend.js
'use strict';

(function () {
  var URL = {
    Get: 'https://js.dump.academy/keksobooking/data',
    Post: 'https://js.dump.academy/keksobooking'
  };
  var SERVER_CODE_OK = 200;
  var TIMEOUT = 10000;
  var startXhr = function (url, connectMetod, onSucces, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_CODE_OK) {
        onSucces(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел обработаться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;

    xhr.open(connectMetod, url);
    xhr.send(data);
  };

  var load = function (onSucces, onError) {
    startXhr(URL.Get, 'GET', onSucces, onError);
  };

  var save = function (data, onSucces, onError) {
    startXhr(URL.Post, 'POST', onSucces, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
