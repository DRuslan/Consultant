<template>
  <Wrapper
    :style="{ left: `${positionX}px`, top: `-12px` }"
    :isVisible="isVisible && windowType === 'Chat'"
    :header-icon="dataWindow.window.header.iconName"
    :header-title="dataWindow.window.header.title"
  >
    <div
      class="window"
      :class="dataWindow.window.header.title ? 'window_no_top_border' : ''"
      :style="{ backgroundColor: $widjet().global.color }"
    >
      <div class="chat">
        <div class="chat__inner" :style="{ color: $widjet().global.textPrimary }">
          <div class="chat__message bot">
            <div class="bot__img">
              <img src="../../images/content/manager.png" alt="" />
            </div>
            <div class="bot__message">
              <p>
                Здравствуйте! Чем могу помочь?
              </p>
            </div>
          </div>
          <div class="chat__message client">
            <div class="client__message" >
                <p>Хочу купить коммутаторы и 20 штук 24 портовый шлюзов</p>
            </div>
          </div>
        </div>
        <form action="#" @submit="send" class="chat__form">
          <div class="chat__row">
            <textarea name="message" id="" cols="30" rows="1"></textarea>
            <button type="submit">
              <Icon class="tg-icon" size="m" icon-name="tg_send"></Icon>
            </button>
          </div>
        </form>
      </div>
      <div
        class="figure"
        :class="[figurePos === 'left' ? 'figure_left' : '']"
      ></div>
    </div>
  </Wrapper>
</template>
    
<script setup>
import Icon from "../Base/Icon.vue";
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
  &_no_top_border {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .figure {
    background-color: #e7e8ed;
    border-radius: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 6px;
    position: relative;
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

.chat {
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  background: #e7e8ed;
  min-height: 200px;
  justify-content: flex-end;
  &__inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 250px;
    max-height: 365px;
    padding: 16px 6px 16px;
    overflow: scroll;
  }
  &__message {
    max-width: 270px;
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__form {
    padding-top: 12px;
    width: 100%;
    textarea {
      border-radius: 4px;
      width: 100%;
      padding: 12px;
      resize: none;
      border: none;
    }
  }
  &__row {
    position: relative;
    display: flex;
    border-radius: 6px;
    background-color: #fff;
    button {
      border: none;
      background: transparent;
      padding: 0 13px 0 0;
      .tg-icon {
        margin-top: 3px;
      }
      // position: absolute;
      // top: 0;
      // right: 0;

      // padding: 12px;
    }
  }
}

.bot {
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  width: 100%;
  &__img {
    img {
      width: 41px;
      height: 41px;
      border-radius: 50%;
    }
  }

  &__message {
    background-color: #fff;
    position: relative;
    border-radius: 0 8px 8px 8px;
    padding: 12px;
    max-width: 218px;

    &:after {
      content: "";
      position: absolute; /* Абсолютное позиционирование */
      left: -10px;
      top: -10px; /* Положение треугольника */
      border: 10px solid transparent; /* Прозрачные границы */
      border-top: 10px solid #fff; /* Добавляем треугольник */
      transform: rotate(225deg);
    }
  }
}

.client { 
  align-self: flex-end;
  position: relative;
  padding-right: 10px;
  &:after {
    content: "";
    position: absolute; /* Абсолютное позиционирование */
    right: 0px;
    bottom: 5px; /* Положение треугольника */
    border: 10px solid transparent; /* Прозрачные границы */
    border-top: 10px solid #D8E1EA; /* Добавляем треугольник */
    transform: rotate(135deg);
  }
  &__message {
    width: 100%;
    background-color: #D8E1EA;
    padding: 12px;
    border-radius: 12px;
    border-bottom-right-radius: 0;
    max-width: 218px;
    padding-right: 10px;
  }
}
</style>