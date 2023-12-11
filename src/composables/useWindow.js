// Задача данного композибла разрешить и нормализовать работу окон в консультанте
import axios from "axios";
import { inject, ref } from "vue";
import { openModal } from "../store/modals";

const widthDevice = ref(window.innerWidth);
const isWindowVisible = ref(false);
const windowType = ref(""); // Переменная для определения типа окна
let windowPosition = ref(null);

export default function showWindow(event, type) {
    const el = event.target;
    const elTargetLeft = el.getBoundingClientRect().left;

    // Если тип окна уже открыт, то закрываем его
    if (windowType.value === type) {
        windowType.value = '';
        isWindowVisible.value = false;
    } else {
        windowPosition.value = elTargetLeft;
        elOutViewport(windowPosition.value);
        windowType.value = type;
        isWindowVisible.value = true;
        localStorage.setItem("managerDisabled", true);
        autoShowChat.value = false;
    }
    // return {
    //     send
    // }
}

export default function calculateWidthDevice() {
    widthDevice
}