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
    // const formValidate = ref(props.form);
    const success = ref(false);
    const send = async () => {

      if (!validate(props.form)) {
        const formData = new FormData(); // Constructor JS (Form building)
        formData.append("Site", location.href);
        formData.append("Political", true);
        // перебираем поля в форме с актальный value
        for(const key in props.form) {
          const value = props.form[key].value;
          if (value != null && value !== ''){
            formData.append(key, value);
          }
        }

        await axios.post(
          "https://network-technologies.ru/api/send-lead/bpm",
          formData, 
          {
            headers: {
              // Включите куки в заголовки запроса
              Cookie: "visit_id=7145169",
            },
          }
        )
        .then(response => {
          success = true;
          console.log(response);
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
      success,
      send
    };

  },

  methods: {
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