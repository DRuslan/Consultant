<template>
  <div class="widjet">
    <PanelCol hr="right">
      <WidjetLink />
    </PanelCol>

    <PanelCol size="m">
      <WidjetContact />
    </PanelCol>

    <PanelCol hr="left">
      <WidjetLink />
    </PanelCol>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import PanelCol from "./PanelCol.vue";
import WidjetLink from "./WidjetLink.vue";
import WidjetContact from "./WidjetContact.vue";

const props = defineProps({
  entryData: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.widjet {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #3B6EC7;
  z-index: -1;
  display: flex;
  justify-content: space-between;
}
</style>