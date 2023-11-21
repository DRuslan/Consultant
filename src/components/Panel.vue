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
        size="m"
        @click="showWindow($event, 'Manager_1')"
        :visibility="entryData.onlineConsultant[1].visibility"
        :windowWidth="widthDevice"
      > 
      <div class="widjet__content">
        <WidjetDefault
          v-bind="entryData.onlineConsultant[0].button"
          class="widjet__text-content"
        />
      </div>
      <div class="widjet__mask" v-show="notificationMessage" :class="`${notificationMessage ? 'widjet-notification' : ''}`"></div>
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
      :dataChat="outputScript"
      :positionX="windowPosition"
      figurePos="center"
    />
    <ModalsContainer />
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, computed, onBeforeUnmount, inject } from "vue";

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
  const el = event.target; // панель по которой кликнули
  let elTargetLeft = el.getBoundingClientRect().left;
  windowPosition.value = elTargetLeft;
  elOutViewport(windowPosition.value);
  windowType.value = type;
  isWindowVisible.value = true;
}
// передаем координаты и показываем чат автоматом
const mangerElement = ref(null);
// local storage autoMode
const autoShowChat = ref(true); 
// Session storage comeback
let isComeback = sessionStorage.getItem("comeback");

if (localStorage.getItem("chatAutoMode")) {
  autoShowChat.value = false;
}

onMounted(() => {
  if (autoShowChat.value) {
    console.log('mangerElement.value');
    console.log(mangerElement.value.getBoundingClientRect().left);
    autoShowWindowChat(mangerElement.value.getBoundingClientRect().left);
  }

  if (isComeback === null || isComeback !== "false") {
    document.addEventListener("mouseleave", comeback);
  }

  if (isComeback === null && widthDevice.value >= 768 || isComeback !== "false" && widthDevice.value >= 768) {
    setTimeout(() => {
      comeback();
    }, 120000)
  }

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("mouseleave", comeback);
  window.removeEventListener("resize", handleResize);
});

// вычисляем сценарий переписки
const outputScript = computed(() => autoShowChat.value ? props.entryData.autoMessage[1].script : props.entryData.autoMessage[0].script);

let showWindowChatExecuted = ref(false);

function showWindowChat() {
  if (!showWindowChatExecuted.value) {
    autoShowChat.value = false;
    isWindowVisible.value = true;
    localStorage.setItem("chatAutoMode", autoShowChat.value);
  }
  if (autoShowChat.value === true) {
    localStorage.setItem("chatAutoMode", autoShowChat.value);
  }
  windowType.value = "Chat";
  notificationMessage.value = false;
}

function autoShowWindowChat(pos) {
  console.log('autoShowChat.value POS');
  console.log(pos);
    setTimeout(function () {
        if (autoShowChat.value) {
          windowType.value = "Manager_1";
          notificationMessage.value = true;
          isWindowVisible.value = true;
          windowPosition.value = pos;
          elOutViewport(windowPosition.value);
          showWindowChatExecuted.value = true;
        }
      }, 5000);

      const soundPlugin = inject('sound'); // 'sound' плагин с обработкой когда воспроиводить мелодию
      soundPlugin(audio);
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

// Функция, которая считает выход элементов из потока ширины браузера
function elOutViewport(windowBounceLeft) {
  if (windowPosition.value + 300 < widthDevice.value) {
    windowPosition.value = windowBounceLeft;
    console.log('windowPosition.value < widthDevice.value');
  } 
  else if (windowPosition.value + 300 > widthDevice.value) {
    console.log('windowPosition.value + 300 > widthDevice.value');
    windowPosition.value = widthDevice.value - 324;
  }
  else {
    windowPosition.value = windowBounceLeft;
  }
  console.log(widthDevice.value + " " + (windowPosition.value + 300));
}
</script>

<style lang="scss" scoped>
.widjet {
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  left: 0;
  // z-index: -1;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 576px) {
    height: 40px;  
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
    // z-index: 2;
    width: auto;
  }

  .widjet-notification {
    box-shadow: inset 0px 0px 35px 3px #739ad8;
    animation: blink 1.5s linear infinite;
  }

  &__mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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