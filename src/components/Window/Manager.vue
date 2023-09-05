<template>
  <Wrapper
    :style="{ left: `${positionX}px`, top: `-12px`}"
    :isVisible="
      isVisible && (windowType === 'Manager_0' || windowType === 'Manager_1')
    "
  >
    <div class="window" :style="{ backgroundColor: $widjet().global.color }">
      <div class="manager">
        <div class="manager__img">
            <img :src="dataWindow.img" alt="">
        </div>
        <div class="manager__name">{{ dataWindow.name }}</div>
        <p class="manager__description">{{ dataWindow.description }}</p>
        <div class="manager__btns">
            <button class="manager__btn" @click="$emit('close')"> {{ dataWindow.CloseText }} </button>
            <button class="manager__btn"> {{ dataWindow.WriteText }} </button>
        </div>
      </div>
      <div
        class="figure"
        :class="[figurePos === 'left' ? 'figure_left' : '']"
        :style="{background: $widjet().global.color}"
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
  .manager {
    padding: 24px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    &__img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-bottom: 12px;
        img {
            border-radius: inherit;
        }
    }
    &__description {
        margin-bottom: 24px;
    }
    &__btn {
        padding: 12px 22px;
        border: none;
        border-radius: 50px;
        color: #fff;
        cursor: pointer;
        &:first-child {
            background: rgba(255, 255, 255, 0.15);
            margin-right: 12px;
        }
        &:last-child {
            background: rgba(255, 255, 255, 0.30);
        }
    }
  }
  .figure {
    background: transparent;
    border-radius: 10px;
    padding: 6px;
    position: relative;
    background-color: inherit;
    &:after {
      content: "";
      position: absolute; /* Абсолютное позиционирование */
      width: 14px;
      height: 14px;
      background-color: inherit;
      transform: rotate(-45deg);
      top: 5px;
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