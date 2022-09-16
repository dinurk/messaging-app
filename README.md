# Мессенджер
## Описание
Fullstack приложение-мессенджер.
## Реализованная функциональность
### API:
* Регистрация пользователя
* Авторизация с выдачей токена
* Создание чатов
## Дорабатываемая функциональность
### API:
* Приглашение пользователей в чаты
* Отправка сообщений
### Frontend:
* клиент для приложения
## Инструкция по запуску
* в папке server создать файл .env 
* в .env-файле указать параметры подключения к базе данных (postgres)
    - DATABASE_CONNECTION_REQUEST_INTERVAL - с какой периодичностью (в миллисекундах) будут осуществляться попытки подключения сервера к базе данных
* перейти в папку *server*
* выполнить команду *npm run start*

Проверить работоспособность API можно при помощи Postman