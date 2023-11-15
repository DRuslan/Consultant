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
        // метод очистки форм
        app.provide('resetForm', (form) => {      
            for (const key in form) {
              if (this.form.hasOwnProperty(key)) {
                const field = this.form[key];
                if (typeof field === "object") {
                  if ("value" in field) {
                    if (typeof field.value === "object") {
                      field.value = null;
                    } else if (typeof field.value === "boolean") {
                      field.value = true; // шобы политика не сбрасывалась
                    } else {
                      field.value = "";
                    }
                  }
                  if ("error" in field) {
                    field.error = "";
                  }
                }
              }
            }
          });
    }
};