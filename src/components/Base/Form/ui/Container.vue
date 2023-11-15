<template>
  <div class="form-container">
    <form class="v-form" @submit.prevent="send">
      <slot></slot>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref, inject } from "vue";
import { openModal } from "../../../../store/modals";

export default {
  name: "FormContainer",
  props: {
    thank: String,
    form: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const validate = inject("validate"); // подключаю плагин validate.js
    const resetForm = inject("resetForm"); // подключаю плагин formsHelper.js
    // const formValidate = ref(props.form);
    let success = ref(false);

    const send = () => {
      if (!validate(props.form)) {
        console.log('if (validate(props.form))');
        return true;
      }

      console.log('[2]');
      const formData = new FormData(); // Constructor JS (Form building)

      formData.append("Site", location.href);
      formData.append("Political", true);

      // перебираем поля в форме с актальный value
      for (const key in props.form) {
        const value = props.form[key].value;
        if (value != null && value !== "") {
          formData.append(key, value);
        }
      }

      axios
        .post("/api/send-lead/bpm", formData, 
          { 
            withCredentials: true, 
            headers : {
              Cookie: "visit_id=1111",
            }
          }
        )
        .then(() => {
          openModal(props.thank ? props.thank : "thank");
          setTimeout(() => {
            resetForm(formData);
          }, 3000);
        })
        .catch((error) => {
          let errorResponse = error;

          if (
            errorResponse.errors &&
            Object.keys(errorResponse.errors).length > 0
          ) {
            for (const key in errorResponse.errors) {
              console.log(key, errorResponse.errors[key][0]);
              // if (
              //   errorResponse.errors.hasOwnProperty(key) &&
              //   self.form.hasOwnProperty(key)
              // ) {
              //   self.form[key].error = errorResponse.errors[key][0];
              // }
            }
          }
        });
    };

    return {
      success,
      send,
    };
  },

  methods: {
    // resetForm() {
    //   this.success = false;
    //   for (const key in this.form) {
    //     if (this.form.hasOwnProperty(key)) {
    //       const field = this.form[key];
    //       if (typeof field === "object") {
    //         if ("value" in field) {
    //           if (typeof field.value === "object") {
    //             field.value = null;
    //           } else if (typeof field.value === "boolean") {
    //             field.value = true; // шобы политика не сбрасывалась
    //           } else {
    //             field.value = "";
    //           }
    //         }
    //         if ("error" in field) {
    //           field.error = "";
    //         }
    //       }
    //     }
    //   }
    // },
  },
};
</script>

<style>
</style>