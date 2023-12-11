import axios from "axios";
import { inject, ref } from "vue";
import { openModal } from "../store/modals";
export default function useForm(form, thank, goal, dataGlobals) {
    const isProcessing = ref(false)

    const validate = inject("validate"); // подключаю плагин validate.js
    const resetForm = inject("resetForm"); // подключаю плагин formsHelper.js
    const send = () => {
          // Валидация по праввилам в полях
          if (!validate(form)) {
            return true;
          }

          const formData = new FormData(); // Constructor JS (Form building)
          formData.append("Site", location.href);
          formData.append("Political", true);
          formData.append("allUTM", dataGlobals.allUTM);
          formData.append("City", dataGlobals.geoInfo.city);
          formData.append("Region", dataGlobals.geoInfo.subdivision);
          formData.append("Country", dataGlobals.geoInfo.country);
    
          // перебираем поля в форме с актальный value
          for (const key in form) {
            const value = form[key].value;
            if (value != null && value !== "") {
              formData.append(key, value);
            } 
          }

          // ловим цели
          // getYandexGoal(goal);
    
          axios
            .post("/api/send-lead/bpm", formData, {withCredentials: true})
            .then(() => {
                resetForm(form);
                openModal(thank ? thank : "thank");
            })
            .catch((error) => {
              console.error(error);
            });
        };

        function getYandexGoal (ymGoal) {
          if (ymGoal) {
            window.ym(80162764, 'reachGoal', ymGoal);
          } else {
            console.error('цель не присвоена');
          }
        }
    

    return { send }
}
