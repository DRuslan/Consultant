import axios from "axios";
import { inject, ref } from "vue";
import { openModal } from "../store/modals";
export default function useForm(form, thank, goal) {
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
            // console.log(form[key].value);
            if (value != null && value !== "") {
              formData.append(key, value);
            }

            if (form[key].value === 'krible-fast-mail') {
              alert('krible-fast-mail');
            } 

            if (form[key].value === 'krible-catalog') {
              alert('krible-catalog');
            }
          }
    
          axios
            .post("/api/send-lead/bpm", formData, {withCredentials: true})
            .then(() => {
                resetForm(form);
                openModal(thank ? thank : "thank");
            })
            .catch((error) => {
              console.log(error);
            });
        };
    

    return { send }
}
