<template>
  <transition name="modal-animation">
    <div v-show="isVisible" class="wrapper" :style="{left: `${position}px`}">
      <div
        :style="{ backgroundColor: $widjet().global.color }"
        class="wrapper__header"
      >
        <div class="wrapper__header_title">
          <Icon size="m" :icon-name="headerIcon"></Icon>
          <p>{{ headerTitle }}</p>
        </div>
        <Icon
          size="s"
          icon-name="arrow"
          @click="$emit('close')"
          class="wrapper__header_icon"
        ></Icon>
      </div>
      <slot />
    </div>
  </transition>
</template>
  
<script setup>
import { ref, defineProps } from "vue";
import Icon from "../Base/Icon.vue";

const props = defineProps({
  isVisible: Boolean,
  headerTitle: String,
  headerIcon: String,
  position: Number
});
</script>
  
  <style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  z-index: 5;
  transform: translateY(-100%);
  border-radius: 8px;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 15px 13px;
    width: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    &_title {
      display: flex;
      align-items: center;
      p {
        margin-left: 8px;
      }
    }
    &_icon {
      cursor: pointer;
    }
  }
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
</style>