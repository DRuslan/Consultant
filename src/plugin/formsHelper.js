// Данный плагин нужен для формирования пропсов для полей в форме
export default {
    install: (app) => {
        app.config.globalProperties.$getTextFields = (form) => {
            const textFields = [];
            console.log(textFields);
            for (const key in form) {
                if (Object.prototype.hasOwnProperty.call(form, key) && form[key].type === "text") {
                    console.log(form[key]);
                    textFields.push(form[key]);
                }
            }

            return textFields;
        }
    }
};