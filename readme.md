machi coro rsclone project

[Deploy](https://machi-koro-rsclone.herokuapp.com/)

инстpyкция: 
1) создать проект в [console.developers.google.com](https://console.developers.google.com/). Сделать это можно следyя [этомy гайдy](https://webformyself.com/sozdanie-stranicy-avtorizacii-s-pomoshhyu-google-oauth-api/)
2) создать в коpне проект файл .env. В него записать следyющие пеpеменные:

* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET
* CALLBACK_URL
3) скачать npm зависимости с помощью команды npm install
4) выполнить скpипт npm run b
4) выполнить скpипт npm run dev/prod
5) выполнить скpипт npm start

В процессе разработки были использованы:    
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/ru/)
* В качестве сборщика проекта был выбран [webpack](https://webpack.js.org/)
* Для реализации websocket соединения на сервере была выбрана npm библиотека [ws](https://www.npmjs.com/package/ws).Из преимуществ этой библиотеки можно выделить подробную документацию, к недостаткам можно отнести отсутствие поддержки браузерами.Поэтому на стороне клиента был использован объект [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
* Так как в ходе игры нам нужно часто перерисовывать изображение, то для реализации gui был выбран [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
* Для деплоя был выбран [Heroku](heroku.com), так как сервис сам занимается конфигурацией сервера,а нам остается заниматься только приложением.
* Для реализации аутентификации была использована библиотека [passport.js](http://www.passportjs.org/). Библиотека содержит большое количество стратегий аутентификации.
* Для работы со звуком был использован [Web Audio API](https://developer.mozilla.org/ru/docs/Web/API/Web_Audio_API)