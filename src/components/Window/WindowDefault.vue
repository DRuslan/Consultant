<template>
  <Wrapper :isVisible="isVisible">
    <div class="window">
      <div :style="{ backgroundColor: $widjet().global.color }" class="window__header">
        <div class="window__header_title">
          <Icon size="m" :icon-name="dataWindow.window.header.iconName"></Icon>
          <p>{{ dataWindow.window.header.title }}</p>
        </div>
        <Icon size="m" icon-name="arrow" @click="$emit('close')" class="window__header_icon"></Icon>
      </div>
      <div class="window__body">
        <p class="window__body_title">
          {{ dataWindow.window.body.title }}
        </p>

        <ul class="list">
          <template v-for="(item, index) in dataWindow.window.body" :key="index">
            <li v-if="index !== title" class="list__item">
              <Icon size="m" :icon-name="item.iconName"></Icon>  
              <p>{{ item.value }}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </Wrapper>
</template>

<script setup>
import Wrapper from './WindowWrapper.vue'
import { defineProps } from "vue";
import Icon from "../Base/Icon.vue";

const props = defineProps({
  isVisible: Boolean,
  windowType: String,
  dataWindow: Object
});
</script>

<style lang="scss" scoped>
.window {
  border-radius: 8px;
  width: 300px;
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

  &__body {
    background: #fff;
    color: #000;
    width: 100%;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    padding: 24px;
    &_title {
      text-align: center;
      margin-bottom: 12px;
    }
  }

  .list {
    &__item {
      list-style: none;
      display: flex;
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