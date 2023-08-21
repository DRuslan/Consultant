<template>
  <div class="widjet">
    <div class="widjet__col">
      <PanelCol hr="right" @click="showWindow('Contact')">
        <WidjetContact v-bind="entryData.contact" />
      </PanelCol>

      <PanelCol hr="right">
        <WidjetSocial :social="entryData.social" />
      </PanelCol>

      <PanelCol hr="right">
        <WidjetCatalog v-bind="entryData.catalog" />
      </PanelCol>

      <PanelCol hr="right">
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

    <Window :isVisible="isWindowVisible" @close="hideWindow" v-bind:dataWindow="entryData.contact">
      <template v-if="windowType === 'Contact'" v-slot:header>
        Contact Header
      </template>
      <template v-else-if="windowType === 'Social'" v-slot:header>
        Social Header
      </template>
      <!-- Добавьте другие условия для разных типов окон -->
      <template v-slot:body>
        Window Content
      </template>
    </Window>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

import PanelCol from "./PanelCol.vue";
import WidjetLink from "./WidjetLink.vue";
import WidjetContact from "./WidjetContact.vue";
import WidjetSocial from "./WidjetSocial.vue";
import WidjetCatalog from "./WidjetCatalog.vue";
import Window from "./Window/WindowDefault.vue";

const props = defineProps({
  entryData: {
    type: Object,
    required: true,
  },
});

const isWindowVisible = ref(false);
const windowType = ref(""); // Переменная для определения типа окна

function showWindow(type) {
  windowType.value = type;
  isWindowVisible.value = true;
}

function hideWindow() {
  console.log('close');
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
  background: #3b6ec7;
  z-index: -1;
  display: flex;
  justify-content: space-between;
  &__col {
    display: flex;
  }
}
</style>