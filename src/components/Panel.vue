<template>
  <div class="widjet" :style="{ backgroundColor: $widjet().global.color }">
    <div class="widjet__col">
      <PanelCol hr="right" @click="showWindow($event, 'Contact')">
        <WidjetDefault v-bind="entryData.contact.button" class="widjet__content" />
      </PanelCol>

      <PanelCol hr="right">
        <WidjetSocial :social="entryData.social" class="widjet__content"  />
      </PanelCol>

      <PanelCol hr="right" size="l" @click="showWindow($event, 'Catalog')">
        <WidjetDefault v-bind="entryData.catalog.button" class="widjet__content"  />
      </PanelCol>

      <PanelCol hr="right" size="l" @click="showWindow($event, 'Fast')">
        <WidjetDefault v-bind="entryData.fastmail.button" @click.stop class="widjet__content"  />
      </PanelCol>
    </div>

    <button @click="openModal('callBack')"></button>

    <div class="widjet__col">
      <!-- <PanelCol hr="left" size="l" @click="showWindow($event, 'Manager_0')">
        <WidjetDefault v-bind="entryData.onlineConsultant[0].button" class="widjet__content"  />
      </PanelCol> -->
      <div ref="mangerElement">
        <PanelCol hr="left" size="l" @click="showWindow($event, 'Manager_1')" @dataParams="dataParams($event, 'Manager_1')" ref="mangerElement">
          <WidjetDefault v-bind="entryData.onlineConsultant[0].button" class="widjet__content"/>
        </PanelCol>
      </div>

      <PanelCol size="s" hr="left">
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
      @autoShowChat="autoShowWindowChat"
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
      :dataWindow="entryData.onlineConsultant[0]"
      :positionX="windowPosition"
      figurePos="center"
    />

    <ModalsContainer />
  </div>
</template>

<script setup>
import { defineProps , onMounted, ref } from "vue";

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
import {openModal} from "../store/modals";

const props = defineProps({
  entryData: {
    type: Object,
    required: true,
  },
});

const isWindowVisible = ref(false);
const windowType = ref(""); // Переменная для определения типа окна
const audio = new Audio('./src/audio/whatsapp_web.ogg');
let windowPosition = ref(null);

function showWindow(event, type) {
    const el = event.target;
    console.log(windowPosition.value);
    windowPosition.value = el.getBoundingClientRect().left;
    windowType.value = type;
    isWindowVisible.value = true;
}
// передаем координаты и показываем чат
const mangerElement = ref(null);

onMounted (() => {
  autoShowWindowChat(mangerElement.value.getBoundingClientRect().left);
})

function autoShowWindowChat (pos) {
  setTimeout(function () {
    windowType.value = 'Chat'
    isWindowVisible.value = true;
    windowPosition.value = pos;
    audio.play().then(() => {
      console.log('Мелодия воспроизведена успешно!');
    }).catch(error => {
      console.error('Произошла ошибка при воспроизведении мелодии:', error);
    });
  }, 5000);
}


function showWindowChat (value) {
  windowType.value = 'Chat'
  isWindowVisible.value = value;
}

function hideWindow() {
  console.log("close");
  windowType.value = "";
  isWindowVisible.value = false;
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
  &__col {
    display: flex;
  }
  &__content {
    position: relative;
    z-index: -1;
    width: auto;
  }
}
</style>