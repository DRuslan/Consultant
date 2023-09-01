<template>
  <div class="contact">
    <Icon class="contact__icon" size="m" :icon-name="icon" />
    <p>{{ text }}</p>
    <Icon v-if="iconDop" class="contact__icon_dop" size="m" :icon-name="iconDop" />
  </div>
</template>


<script setup>
import { defineProps } from "vue";
import Icon from "./Base/Icon.vue";

const props = defineProps({
  text: String,
  icon: String,
  iconDop: String
});

</script>


<style lang="scss" scoped>
.contact {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  &__icon {
    margin-right: 12px;
    &_dop {
      margin-left: 8px;
    }
  }
}
</style>