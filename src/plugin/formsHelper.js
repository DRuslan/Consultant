// Данный плагин нужен для формирования пропсов для полей в форме
// getTextFields для скриптов в компонентах расшариваем доступы через provide inject
export default {
    install: (app) => {
        app.provide('getTextFields', (form) => {
            const textFields = [];
            for (const key in form) {
                if (Object.prototype.hasOwnProperty.call(form, key) && form[key].type) {
                    console.log(form[key]);
                    textFields.push(form[key]);
                }
            }
            return textFields;
        });
        // метод очистки форм
        app.provide('resetForm', (form) => {      
            for (const key in form) {
              if (form.hasOwnProperty(key)) {
                const field = form[key];
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

          // Активность кнопки при вводе
          app.provide('getBtnActive', (form) => {      
            for (const field of form) {
              if (field.name === 'Name' || field.name === 'Site') {
                continue;
              }
              if (field.value.length > 0) {
                return true;
              }
            }
            return false
          });
    }
};