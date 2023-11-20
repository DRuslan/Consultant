// Данный плагин нужен для работы с куками
export default {
    install: (app) => {
        // Функция для чтения куки
        app.provide('getCookie', (name) => {
            let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) {
                return JSON.parse(match[2]);
            }
        });

        // Функция для записи куки
        app.provide('setCookie', (name) => {
            let expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
        });

        // Проверяем наличие куки и прошло ли уже сутки
        app.provide('checkCookie', (name, myArray) => {
            let storedCookie = app.config.globalProperties.getCookie(name);
            if (!storedCookie || (storedCookie && storedCookie.timestamp && (Date.now() - storedCookie.timestamp) > (24 * 60 * 60 * 1000))) {
            // Если куки отсутствует или прошли сутки, обновляем массив и устанавливаем новую метку времени
            myArray.timestamp = Date.now();
            app.config.globalProperties.setCookie(name, myArray, 1);  // 1 день
            storedCookie = myArray;
            }
        });
    }
};