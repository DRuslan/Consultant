<template>
  <div class="widjet" :style="{ backgroundColor: $widjet().global.color }">
    <div class="widjet__col">
      <PanelCol
        hr="right"
        @click="showWindow($event, 'Contact')"
        :visibility="entryData.contact.visibility"
        :windowWidth="widthDevice"
      >
        <WidjetDefault
          v-bind="entryData.contact.button"
          class="widjet__content"
        />
      </PanelCol>

      <PanelCol
        hr="right"
        :mobile="true"
        :visibility="entryData.social.visibility"
        :windowWidth="widthDevice"
      >
        <WidjetSocial
          :social="entryData.social.listSocial"
          class="widjet__content"
        />
      </PanelCol>

      <PanelCol
        hr="right"
        size="l"
        @click="showWindow($event, 'Catalog')"
        :visibility="entryData.catalog.visibility"
        :windowWidth="widthDevice"
      >
        <WidjetDefault
          v-bind="entryData.catalog.button"
          class="widjet__content"
        />
      </PanelCol>

      <PanelCol
        hr="right"
        size="l"
        @click="showWindow($event, 'Fast')"
        :visibility="entryData.fastmail.visibility"
        :windowWidth="widthDevice"
      >
        <WidjetDefault
          v-bind="entryData.fastmail.button"
          @click.stop
          class="widjet__content"
        />
      </PanelCol>
    </div>

    <div class="widjet__col widjet__col_r" ref="mangerElement">
      <PanelCol
        hr="left"
        size="l"
        @click="showWindow($event, 'Manager_1')"
        @dataParams="dataParams($event, 'Manager_1')"
        :visibility="entryData.onlineConsultant[1].visibility"
        :class="`${notificationMessage ? 'widjet-notification' : ''}`"
        :windowWidth="widthDevice"
      >
        <WidjetDefault
          v-bind="entryData.onlineConsultant[0].button"
          class="widjet__content"
        />
      </PanelCol>

      <PanelCol size="s" hr="left" :visibility="entryData.onlineConsultant[1].visibility" :windowWidth="widthDevice">
        <WidjetLink />
      </PanelCol>
    </div>
    

    <WindowContact
      :isVisible="isWindowVisible"
      @close="hideWindow"
      :windowType="windowType"
      :dataWindow="entryData.contact"
      :positionX="windowPosition"
      figurePos="left"
    />

    <WindowFast
      :isVisible="isWindowVisible"
      @close="hideWindow"
      :windowType="windowType"
      :dataWindow="entryData.fastmail"
      :positionX="windowPosition"
      figurePos="center"
    >
      <Feedback />
    </WindowFast>

    <WindowCatalog
      :isVisible="isWindowVisible"
      @close="hideWindow"
      :windowType="windowType"
      :dataWindow="entryData.catalog"
      :positionX="windowPosition"
      figurePos="center"
    />

    <!-- <WindowManager 
      :isVisible="isWindowVisible"
      @close="hideWindow"
      :windowType="windowType"
      :dataWindow="entryData.onlineConsultant[0]"
      :positionX="windowPosition"
      figurePos="center"
    /> -->

    <WindowManager
      :isVisible="isWindowVisible"
      @close="hideWindow"
      @showChat="showWindowChat"
      :windowType="windowType"
      :dataWindow="entryData.onlineConsultant[0]"
      :positionX="windowPosition"
      figurePos="center"
    />

    <WindowChat
      :isVisible="isWindowVisible"
      @close="hideWindow"
      @showChat="showWindowChat"
      @autoShowChat="autoShowWindowChat"
      :windowType="windowType"
      :dataWindow="entryData.chat[0]"
      :positionX="windowPosition"
      :script="outputScript"
      figurePos="center"
    />

    <ModalsContainer />
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, computed, onBeforeMount, inject } from "vue";

import PanelCol from "./PanelCol.vue";
import WidjetLink from "./WidjetLink.vue";
import WidjetDefault from "./WidjetDefault.vue";
import WidjetSocial from "./WidjetSocial.vue";
import WindowContact from "./Window/Contact.vue";
import WindowFast from "./Window/Fast.vue";
import WindowCatalog from "./Window/Catalog.vue";
import WindowManager from "./Window/Manager.vue";
import WindowChat from "./Window/Chat.vue";
import Feedback from "./Base/Form/Feedback.vue";
import ModalsContainer from "./Base/Modals/ModalContainer.vue";
import audioNotification from "../audio/whatsapp_web.mp3";
import { openModal } from "../store/modals";

const props = defineProps({
  entryData: {
    type: Object,
    required: true,
  },
});

const widthDevice = ref(window.innerWidth);
const isWindowVisible = ref(false);
const windowType = ref(""); // Переменная для определения типа окна
const audio = new Audio(audioNotification);
const notificationMessage = ref(false);
let windowPosition = ref(null);

function showWindow(event, type) {
  const el = event.target;
  windowPosition.value = el.getBoundingClientRect().left;
  windowType.value = type;
  isWindowVisible.value = true;
}
// передаем координаты и показываем чат автоматом
const mangerElement = ref(null);
// local storage autoMode
let autoMode = localStorage.getItem("chatAutoMode");
// Session storage comeback
let isComeback = sessionStorage.getItem("comeback");

if (autoMode === null || autoMode === undefined) {
  localStorage.setItem("chatAutoMode", true);
}
const soundPlugin = inject('sound'); // 'sound' - это имя, с которым вы зарегистрировали плагин
console.log($sound(''));
onMounted(() => {
  // console.log($sound);
  if (autoMode !== "false") {
    autoShowWindowChat(mangerElement.value.getBoundingClientRect().left);
    // $sound(audio);
  }

  if (isComeback === null || isComeback !== "false") {
    document.addEventListener("mouseleave", comeback);
  }

  if (isComeback === null && widthDevice.value >= 768 || isComeback !== "false" && widthDevice.value >= 768) {
    setTimeout(() => {
      comeback();
    }, 1000)
  }

  window.addEventListener("resize", handleResize);
});

onBeforeMount(() => {
  window.removeEventListener("mouseleave", comeback);
  window.removeEventListener("resize", handleResize);
});

// вычисляем сценарий переписки
const outputScript = computed(() => {
  if (autoMode || autoMode === null) {
    return props.entryData.autoMessage[1].script; // Логика для autoShowWindowChat
  } else {
    return props.entryData.autoMessage[0].script; // Логика для showWindowChat
  }
});

let showWindowChatExecuted = ref(false);

function showWindowChat(value) {
  showWindowChatExecuted.value = true;
  windowType.value = "Chat";
  isWindowVisible.value = value;
  notificationMessage.value = false;
  localStorage.setItem("chatAutoMode", false);
}

function autoShowWindowChat(pos) {
  console.log(autoMode);
  if (autoMode !== "false") {
    setTimeout(function () {
      if (!showWindowChatExecuted.value) {
        localStorage.setItem("chatAutoMode", false);
        windowType.value = "Manager_1";
        notificationMessage.value = true;
        isWindowVisible.value = true;
        windowPosition.value = pos;
        console.log("setTimeout");
        // audio.play().then(() => {
        //     console.log("Мелодия воспроизведена успешно!");
        //   }).catch((error) => {
        //     console.error("Произошла ошибка при воспроизведении мелодии:", error);
        //     audio.resume().then(() => {
        //       console.log('Playback resumed successfully');
        //     });
        //   });
      }
    }, 5000);
  }
}

function hideWindow() {
  windowType.value = "";
  isWindowVisible.value = false;
}

// comeback
function comeback() {
  if (isComeback !== "false" && widthDevice.value > 768) {
    sessionStorage.setItem("comeback", "false");
    isComeback = sessionStorage.getItem("comeback");
    console.log(isComeback);
    openModal("callBack");
  }
}

// Функция, которая будет вызываться при изменении размера окна
function handleResize() {
  widthDevice.value = window.innerWidth; // Обновляем значение widthDevice при изменении размера окна
}
</script>

<style lang="scss" scoped>
.widjet {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  // z-index: -1;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 576px) {
    height: 40px;  
  }
  .widjet-notification {
    animation: blink 1.5s linear infinite;
  }
  &__col {
    display: flex;
    // @media screen and (max-width: 768px) {
    //   width: 100%;
    // }
    &_r {
      @media screen and (max-width: 576px) {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  &__content {
    position: relative;
    z-index: -1;
    width: auto;
  }
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.2;
  }
}
</style>