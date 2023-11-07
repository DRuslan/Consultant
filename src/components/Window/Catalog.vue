<template>
  <Wrapper
    :style="{ left: `${positionX}px` }"
    :isVisible="isVisible && windowType === 'Catalog'"
    :header-icon="dataWindow.window.header.iconName"
    :header-title="dataWindow.window.header.title"
  >
    <div class="window">
      <div class="window__body">
        <img class="window__img" :src="dataWindow.window.body.img" alt="" />
        <div class="window__content" v-if="activeMessenger.length === 0">
          <p class="window__title">{{ dataWindow.window.body.title }}</p>
          <p class="window__description">
            {{ dataWindow.window.body.description }}
          </p>
          <ul class="list">
            <li
              class="list__item"
              v-for="item in dataWindow.window.body.messengers"
              :key="item"
              @click="selectMessenger(item)"
            >
              <Icon size="m" :icon-name="item.icon" />
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </div>
        <div class="window__content" v-if="activeMessenger.length != 0">
            <p class="window__title">
                Укажите данные <Icon size="s" :icon-name="activeMessenger.icon" /> {{ activeMessenger.name }} для отправки каталога
            </p>
            <CatalogForm @backStep="backMessenger"></CatalogForm>
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
import Icon from "../Base/Icon.vue";
import CatalogForm from "../Base/Form/Catalog.vue";
import { defineProps, ref } from "vue";

const props = defineProps({
  isVisible: Boolean,
  windowType: String,
  dataWindow: Object,
  figurePos: String,
  positionX: Number,
});

let activeMessenger = ref('');

function selectMessenger (typeMessenger) {
    activeMessenger.value = typeMessenger;
}

function backMessenger () {
    activeMessenger.value = '';
}

</script>
    
<style lang="scss" scoped>
.window {
  border-radius: 8px;
  width: 300px;
  position: relative;

  &__img {
    margin-bottom: 6px;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
    color: #5b5b5b;
    text-align: center;
    margin: 0 -12px 12px;
  }

  &__description {
    margin-bottom: 24px;
    font-size: 13px;
  }

  &__content {
    text-align: center;
    p {
      color: #5b5b5b;
      font-size: 12px;
    }
  }

  &__title {
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
  }
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
      top: 0px;
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
    border: 1px solid #CCCCCC;
    padding: 24px;
    &_title {
      text-align: center;
      margin-bottom: 12px;
    }
  }

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      list-style: none;
      display: flex;
      align-items: center;
      width: 48%;
      background: #ededed;
      padding: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all .3s ease-in-out;
      &:hover {
        opacity: .7;
      }
      &:nth-last-child(-n + 2) {
        margin-bottom: 0;
      }
      p {
        margin-left: 6px;
      }
    }
  }
}
</style>