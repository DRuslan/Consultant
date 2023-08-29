<template>
  <div class="widjet" :style="{ backgroundColor: $widjet().global.color }">
    <div class="widjet__col">
      <PanelCol hr="right" @click="showWindow($event, 'Contact')">
        <WidjetContact v-bind="entryData.contact.button" />
      </PanelCol>

      <PanelCol hr="right">
        <WidjetSocial :social="entryData.social" />
      </PanelCol>

      <PanelCol hr="right">
        <WidjetCatalog v-bind="entryData.catalog" />
      </PanelCol>

      <PanelCol hr="right" @click="showWindow($event, 'Fast')">
        <WidjetCatalog v-bind="entryData.fastmail" />
      </PanelCol>
    </div>

    <div class="widjet__col">
      <PanelCol hr="left">
        <WidjetCatalog v-bind="entryData.fastmail" />
      </PanelCol>

      <PanelCol hr="left">
        <WidjetCatalog v-bind="entryData.fastmail" />
      </PanelCol>

      <PanelCol size="s" hr="left">
        <WidjetLink />
      </PanelCol>
    </div>

    <WindowContact
      :isVisible="isWindowVisible"
      @close="hideWindow"
      :windowType="windowType"
      :dataWindow="entryData.contact"
      :positionX="leftPosition"
      figurePos="left"
    />
    <WindowFast
      :isVisible="isWindowVisible"
      @close="hideWindow"
      :windowType="windowType"
      :dataWindow="entryData.contact"
      :positionX="windowPosition"
      figurePos="left"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref } from "vue";

import PanelCol from "./PanelCol.vue";
import WidjetLink from "./WidjetLink.vue";
import WidjetContact from "./WidjetContact.vue";
import WidjetSocial from "./WidjetSocial.vue";
import WidjetCatalog from "./WidjetCatalog.vue";
import WindowContact from "./Window/WindowContact.vue";
import WindowFast from "./Window/WindowFast.vue";

const props = defineProps({
  entryData: {
    type: Object,
    required: true,
  },
});

const isWindowVisible = ref(false);
const windowType = ref(""); // Переменная для определения типа окна
let windowPosition = ref(null);

computed(() => {
  return console.log($getGlobalColor);
});

function showWindow(event, type) {
  const el = event.target;
  const leftPosition = el.getBoundingClientRect().left;
  windowPosition = leftPosition;
  console.log(typeof leftPosition);
  windowType.value = type;
  console.log(windowType.value);
  isWindowVisible.value = true;
}

function hideWindow() {
  console.log("close");
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
  z-index: -1;
  display: flex;
  justify-content: space-between;
  &__col {
    display: flex;
  }
}
</style>