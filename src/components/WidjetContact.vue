<template>
  <div class="contact">
    <Icon class="contact__icon" size="m" :icon-name="btnIconName" />
    <p>{{ btnText }}</p>
  </div>
</template>


<script setup>
import { defineProps } from "vue";
import Icon from "./Base/Icon.vue";

const props = defineProps({
  btnIconName: String,
  btnText: String,
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
  }
}
</style>