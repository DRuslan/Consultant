<template>
  <div class="form-container">
    <form class="v-form" @submit.prevent="composableForm.send">
      <slot></slot>
    </form>
  </div>
</template>

<script setup>
import useForm from '../../../../composables/useForm'
import { defineProps } from 'vue';

const props = defineProps({
  thank: String,
  form: {
    type: Object,
    required: true,
  },
});

    const composableForm = useForm(props.form, props.thank);
    // const resetForm = inject("resetForm"); // подключаю плагин formsHelper.js
    // const validate = inject("validate"); // подключаю плагин validate.js
    // const formValidate = ref(props.form);

    // const send = () => {
    //   // if (!composableForm.validate(props.form)) {
    //   if (!validate(props.form)) {
    //     console.log('if (validate(props.form))');
    //     return true;
    //   }
    //   // composableForm.counter++
    //   const formData = new FormData(); // Constructor JS (Form building)

    //   formData.append("Site", location.href);
    //   formData.append("Political", true);

    //   // перебираем поля в форме с актальный value
    //   for (const key in props.form) {
    //     const value = props.form[key].value;
    //     if (value != null && value !== "") {
    //       formData.append(key, value);
    //     }
    //   }

    //   axios
    //     .post("/api/send-lead/bpm", formData, 
    //       { 
    //         withCredentials: true, 
    //         headers : {
    //           Cookie: "visit_id=1111",
    //         }
    //       }
    //     )
    //     .then(() => {
    //       openModal(props.thank ? props.thank : "thank");
    //       setTimeout(() => {
    //         resetForm(formData);
    //       }, 3000);
    //     })
    //     .catch((error) => {
    //       let errorResponse = error;

    //       if (
    //         errorResponse.errors &&
    //         Object.keys(errorResponse.errors).length > 0
    //       ) {
    //         for (const key in errorResponse.errors) {
    //           console.log(key, errorResponse.errors[key][0]);
    //           // if (
    //           //   errorResponse.errors.hasOwnProperty(key) &&
    //           //   self.form.hasOwnProperty(key)
    //           // ) {
    //           //   self.form[key].error = errorResponse.errors[key][0];
    //           // }
    //         }
    //       }
    //     });
    // };

    // return {
    //   success,
    //   send,
    // };
</script>

<style>
</style>