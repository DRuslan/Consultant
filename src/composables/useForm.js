import axios from "axios";
import { inject, ref } from "vue";
import { openModal } from "../store/modals";
export default function useForm(form, thank) {
    const isProcessing = ref(false)

    const validate = inject("validate"); // подключаю плагин validate.js
    const resetForm = inject("resetForm"); // подключаю плагин formsHelper.js
    const send = () => {
          // Валидация по праввилам в полях
          if (!validate(form)) {
            console.log('if (validate(form))');
            return true;
          }

          const formData = new FormData(); // Constructor JS (Form building)
          formData.append("Site", location.href);
          formData.append("Political", true);
    
          // перебираем поля в форме с актальный value
          for (const key in form) {
            const value = form[key].value;
            if (value != null && value !== "") {
              formData.append(key, value);
            }
          }
    
          axios
            .post("/api/send-lead/bpm", formData, {withCredentials: true})
            .then(() => {
              openModal(thank ? thank : "thank");
              setTimeout(() => {
                resetForm(formData);
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
            });
        };
    

    return { send }
}
