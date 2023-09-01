<template>
    <div class="form-container">
      <form class="v-form" @submit.prevent="send">
        <slot></slot>
      </form>
    </div>
  </template>

<script>
// import validate from '@/mixins/validate';
// import notification from "@/mixins/NotificationMixin";
export default {
  name: "FormContainer",
//   mixins: [validate, notification],
  props: {
    form: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      success: false
    }
  },
  methods: {
    send() {
    //   if (!this.validate()) {
    //     this.notifyError('Заполните обязательные поля');
    //     return true;
    //   }

    //   const self = this;

    //   const formData = new FormData();

    //   formData.append("Name", this.formName);
    //   formData.append("Site", location.href);
    //   if (this.testLead){
    //     formData.append("test_lead", true);
    //   }

    //   for(const key in this.form) {
    //     const value = this.form[key].value;
    //     if (value != null && value !== ''){
    //       formData.append(key, value);
    //     }
    //   }

    //   post("/api/send-lead", formData)
    //       .then(() => {
    //         this.success = true;

    //         this.notifySuccess('Заявка успешно отправлена');

    //         setTimeout(() => {
    //           this.resetForm();
    //         }, 3000);
    //       })
    //       .catch(function (error) {
    //         self.notifyError('Ошибка при отправке заявки');
    //         let errorResponse = error.response.data;

    //         if (errorResponse.errors && Object.keys(errorResponse.errors).length > 0) {
    //           for (const key in errorResponse.errors) {
    //             if (errorResponse.errors.hasOwnProperty(key) && self.form.hasOwnProperty(key)) {
    //               self.form[key].error = errorResponse.errors[key][0];
    //             }
    //           }
    //         }
    //       })

    // fetch('ваш_серверный_эндпоинт', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json', // Замените на нужный Content-Type
    //     },
    //     body: JSON.stringify(this.formData), // Зависит от Content-Type, может потребоваться преобразовать данные
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Произошла ошибка при отправке формы');
    //     }
    //     return response.json(); // Может потребоваться другое преобразование, в зависимости от ожидаемого ответа
    //   })
    //   .then(data => {
    //     // Обработка успешного ответа от сервера
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     // Обработка ошибки
    //     console.error(error.message);
    //   });
    // },

    },

    resetForm() {
      this.success = false;

      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          const field = this.form[key];
          if (typeof field === 'object') {
            if ('value' in field) {
              if (typeof field.value === 'object') {
                field.value = null;
              } else if (typeof field.value === 'boolean') {
                field.value = true; // шобы политика не сбрасывалась
              } else {
                field.value = '';
              }
            }
            if ('error' in field) {
              field.error = '';
            }
          }
        }
      }
    },
  }
}
</script>

<style>

</style>