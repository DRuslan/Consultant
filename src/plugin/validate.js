// Данный плагин нужен для валидации форм
export default {
  install: (app) => {
    const validationRules = {
      required: '{name} обязательно для заполнения',
      string: '{name} должно быть строкой',
      number: '{name} должно быть числом',
      integer: '{name} должно быть целым числом',
      min: 'Минимальное значение для поля {name}: {0}',
      max: 'Максимальное значение для поля {name}: {0}',
      between: 'Диапазон значений для поля {name}: {0} - {1}',
      minLength: 'Минимальное количество символов для поля {name}: {0}',
      maxLength: 'Максимальное количество символов для поля {name}: {0}',
      email: 'Адрес электронной почты должен содержать символ @',
      phone: 'Введите корректный номер мобильного телефона',
      check: 'Вы должны согласиться с {name}',
    };
    app.provide('validate', (form) => {
      const RULES = {
        required: (value) => Boolean(value),
        string: (value) => typeof value === 'string' || value instanceof String,
        number: (value) => (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')) && !isNaN(value),
        phone: (value) => new RegExp(/^((\+7)|7|8)[0-9]{10}$/).test(value),
        integer: (value) => Number.isInteger(Number(value)),
        min: (value, min) => Number(value) >= Number(min),
        max: (value, max) => Number(value) <= Number(max),
        minLength: (value, length) => value.length >= Number(length),
        maxLength: (value, length) => value.length <= Number(length),
        check: (value) => value === true,
        email: (value) => {
          const localPart = '([.]{0,1}[-!#$%&\'*+/=?^_`{|}~A-Za-z0-9]){1,}';
          const domain = `[A-Za-z0-9]([-]{0,1}[A-Za-z0-9])*(\\.[-A-Za-z0-9]*[A-Za-z0-9]){1,}`;
          return new RegExp(`^${localPart}@${domain}$`).test(value);
        },
      };

      Object.keys(form).forEach((item) => {
        if (!Object.prototype.hasOwnProperty.call(form[item], 'rules')) {
          return;
        }

        const fieldCurrent = form[item];
        const fieldRules = form[item].rules;

        if (fieldRules.length) {
          fieldRules.forEach((rule) => {
            const [ruleName, params = ''] = rule.split(':');
            const ruleParams = params.split(',');
            // проверка на правило валидации
            if (!RULES[ruleName](fieldCurrent.value, ...ruleParams)) {
              const errorMsg = validationRules[ruleName];
              const formattedErrorMsg = errorMsg.replace(/\{(\d+)\}/g, (match, index) => {
                return ruleParams[index] || match;
              }).replace("{name}", fieldCurrent.name);

              fieldCurrent.errorMessage = formattedErrorMsg;
              
              // console.log('fieldCurrent', fieldCurrent);
              // console.log('Форма не прошла проверку');
              // console.log("Ошибка валидации формы: "+formattedErrorMsg);
            } else {
              fieldCurrent.errorMessage = '';
            }
          });
        }
      })
      // обработка если данные валидные (НАВЕРНОЕ!!!?)
      return Object.values(form).every((item) => {
          if (Object.hasOwn(item, 'errorMessage')) {
              return !item.errorMessage.length;
          }
          return true;
      });
    });
  },
};