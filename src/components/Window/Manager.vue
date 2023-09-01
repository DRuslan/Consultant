<template>
  <Wrapper
    :style="{ left: `${positionX}px` }"
    :isVisible="
      isVisible && (windowType === 'Manager_0' || windowType === 'Manager_1')
    "
  >
    <div class="window">
      <div class="manager">
        <div class="manager__img"></div>
        <div class="manager__name">{{ dataWindow.name }}</div>
        <p class="manager__description">{{ dataWindow.description }}</p>
        <div class="manager__btns">
            <button> {{ dataWindow.CloseText }} </button>
            <button> {{ dataWindow.WriteText }} </button>
        </div>
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
}
</style>