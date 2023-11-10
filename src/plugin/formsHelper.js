// Данный плагин нужен для формирования пропсов для полей в форме
// getTextFields для скриптов в компонентах расшариваем доступы через provide inject
export default {
    install: (app, options) => {
        app.provide('getTextFields', (form) => {
            const textFields = [];
            for (const key in form) {
                if (Object.prototype.hasOwnProperty.call(form, key) && form[key].type === options.fieldType) {
                    textFields.push(form[key]);
                }
            }
            return textFields;
        });
        // для шаблонов в компонетах для вызова $getTextFields
        app.config.globalProperties.$getTextFields = (form) => {
            const textFields = [];
            for (const key in form) {
                if (Object.prototype.hasOwnProperty.call(form, key) && form[key].type === "text") {
                    textFields.push(form[key]);
                }
            }

            return textFields;
        }
    }
};