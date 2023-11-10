<template>
    <div class="form-container">
      <form class="v-form" @submit.prevent="send">
        <slot></slot>
      </form>
    </div>
  </template>

<script>
import axios from 'axios';
import { ref, inject } from "vue";
import { openModal } from "../../../../store/modals";

export default {
  name: "FormContainer",
  props: {
    form: {
      type: Object,
      required: true
    },
  },

  setup (props, context) {
    const validate = inject('validate'); // подключаю плагин validate.js
    const formValidate = ref(props.form);
    const success = ref(false);
    console.log(context.root);
    const send = async () => {
      if (!validate(formValidate.value)) {
        await axios.post("https://network-technologies.ru/api/send-lead/bpm", props.form)
        .then(response => {
          success = true;
          if (success) {
            openModal('thank');
          }
          // this.resetForm();
        })
        .catch(e => {
          alert(e);
          console.log('error');
        })
      }
    };

    return {
      formValidate,
      success,
      send
    };

  },
  methods: {
    // send() {
    //   if (!this.$validate(formValidate.value)) {
    //     // return false;
    //     openModal('thank');
    //     axios.post("https://network-technologies.ru/api/send-lead/bpm", this.form)
    //     .then(response => {
    //       this.success = true;
    //       openModal('thank');
    //       this.resetForm();
    //     })
    //     .catch(e => {
    //       console.log(e);
    //       console.log('error');
    //     })
    //   }

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

    // },

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