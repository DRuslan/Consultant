// Данный плагин нужен для формирования пропсов для полей в форме
// getTextFields для скриптов в компонентах расшариваем доступы через provide inject
export default {
    install: (app) => {
        app.provide('getTextFields', (form) => {
            const textFields = [];
            for (const key in form) {
                if (Object.prototype.hasOwnProperty.call(form, key) && form[key].type) {
                    textFields.push(form[key]);
                }
            }
            return textFields;
        });
    }
};