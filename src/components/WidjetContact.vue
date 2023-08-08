<template>
  <div class="social">
    <div class="social__item">
        <Icon size="m" name="geo" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Icon from "./Base/Icon.vue";

const props = defineProps({
  entryData: {
    type: Array,
    required: true,
  },
});

</script>

<style lang="scss" scoped>
    .social {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
</style>