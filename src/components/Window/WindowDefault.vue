<template>
  <transition name="modal-animation">
    <div v-show="isVisible" class="window">
      <slot name="header"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot>
      <button @click.self="$emit('close')">X</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  isVisible: Boolean,
});
</script>

<style lang="scss" scoped>
.window {
  position: absolute;
  top: 0;
  z-index: 5;
  transform: translateY(-100%);
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