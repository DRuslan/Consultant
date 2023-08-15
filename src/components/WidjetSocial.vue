<template>
  <div class="social">
    <div v-for="(item, index) in social" :key="index" class="social__item">
        <a :href="item.link" class="social__link">
            <Icon class="contact__icon" size="l" :iconName="item.iconName" />
        </a>
    </div>
  </div>
</template>
  
  
<script setup>
import { defineProps } from "vue";
import Icon from "./Base/Icon.vue";

const props = defineProps({
  social: Array,
});
</script>
  
  
  <style lang="scss" scoped>
.social {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  &__item {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__link {
    display: flex;
  }
}
</style>