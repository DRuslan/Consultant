<template>
  <div class="widjet">
    <PanelCol position="left" size="s" hr="right">
      <WidjetLink />
    </PanelCol>

    <PanelCol position="left" hr="right">
      <WidjetContact :fields="toRefs(entryData.contact)" />
    </PanelCol>

    <PanelCol size="s" hr="left">
      <WidjetLink />
    </PanelCol>
  </div>
</template>

<!-- <script>
import PanelCol from "./PanelCol.vue";
import WidjetLink from "./WidjetLink.vue";
import WidjetContact from "./WidjetContact.vue";

export default {
  components: { PanelCol, WidjetLink, WidjetContact },
  props: {
    entryData: {
      type: Object,
      required: true,
    },
  },
};
</script> -->

<script setup>
import { defineProps } from "vue";

import PanelCol from "./PanelCol.vue";
import WidjetLink from "./WidjetLink.vue";
import WidjetContact from "./WidjetContact.vue";

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