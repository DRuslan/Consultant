<template>
  <transition name="fade">
  <!-- <transition :name="transitionName"> -->
    <div v-if="isVisible" class="wrapper" :style="{left: `${position}px`}">
      <div 
        v-if="headerIcon || headerTitle"
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
import { ref, defineProps, watch } from "vue";
import Icon from "../Base/Icon.vue";

const props = defineProps({
  isVisible: Boolean,
  headerTitle: String,
  headerIcon: String,
  position: Number
});

// const handleAfterEnter = () => {
//   console.log('Анимация входа завершена');
//   // Ваши дополнительные действия после окончания анимации входа
// };

// const handleAfterLeave = () => {
//   console.log('Анимация выхода завершена');
//   // Ваши дополнительные действия после окончания анимации выхода
// };

// const transitionName = ref("modal-animation");

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
    // added prod
    align-items: center;
    // END added prod
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
        font-size: 14px;
      }
    }
    &_icon {
      cursor: pointer;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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