<template>
  <div class="widjet">
    <PanelCol position="left" size="s" hr="right">
      <WidjetLink />
    </PanelCol>

    <PanelCol position="left" hr="right">
      <WidjetContact v-bind="entryData.contact" />
    </PanelCol>

    <PanelCol position="left" hr="right">
      <WidjetSocial :social="entryData.social" />
    </PanelCol>

    <PanelCol position="left" hr="right">
      <WidjetCatalog v-bind="entryData.catalog" />
    </PanelCol>

    <PanelCol position="left" hr="right">
      <WidjetCatalog v-bind="entryData.fastmail" />
    </PanelCol>

    <PanelCol position="right" hr="left">
      <WidjetCatalog v-bind="entryData.fastmail" />
    </PanelCol>

    <PanelCol position="right" hr="left">
      <WidjetCatalog v-bind="entryData.fastmail" />
    </PanelCol>

    <PanelCol size="s" hr="left">
      <WidjetLink />
    </PanelCol>
  </div>
</template>

<script setup>
import { defineProps, toRaw } from "vue";

import PanelCol from "./PanelCol.vue";
import WidjetLink from "./WidjetLink.vue";
import WidjetContact from "./WidjetContact.vue";
import WidjetSocial from "./WidjetSocial.vue";
import WidjetCatalog from "./WidjetCatalog.vue";

const props = defineProps({
  entryData: {
    type: Object,
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
  background: #3b6ec7;
  z-index: -1;
  display: flex;
}
</style>