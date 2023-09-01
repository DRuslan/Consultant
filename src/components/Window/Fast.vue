<template>
  <Wrapper
    :style="{ left: `${positionX}px` }"
    :isVisible="isVisible && windowType === 'Fast'"
    :header-icon="dataWindow.window.header.iconName"
    :header-title="dataWindow.window.header.title"
  >
    <div class="window">
      <div class="window__body">
        <slot></slot>
      </div>
      <div
        class="figure"
        :class="[figurePos === 'left' ? 'figure_left' : '']"
      ></div>
    </div>
  </Wrapper>
</template>
  
  <script setup>
import Wrapper from "./WindowWrapper.vue";
import { defineProps } from "vue";

const props = defineProps({
  isVisible: Boolean,
  windowType: String,
  dataWindow: Object,
  figurePos: String,
  positionX: Number,
});
</script>
  
  <style lang="scss" scoped>
.window {
  border-radius: 8px;
  width: 300px;
  position: relative;
  .figure {
    background: transparent;
    border-radius: 10px;
    padding: 6px;
    position: relative;
    color: #fff;
    &:after {
      content: "";
      position: absolute; /* Абсолютное позиционирование */
      border: 7px solid transparent;
      border-top: 7px solid #fff;
      top: 1px;
      left: calc(50% - 7px);
    }
    &_left {
      &::after {
        left: 25%;
      }
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
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
      p,
      a {
        margin-left: 14px;
        font-size: 13px;
      }
      a {
        display: flex;
        align-items: center;
        color: #000;
      }
    }
  }
}
</style>