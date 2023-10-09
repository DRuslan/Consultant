export default {
    install: (app) => {
        app.config.globalProperties.$getTextFields = (form) => {
            const textFields = [];

            for (const key in form) {
                if (form.hasOwnProperty(key) && form[key].type === "text") {
                    textFields.push(form[key]);
                }
            }

            return textFields;
        }
    }
};