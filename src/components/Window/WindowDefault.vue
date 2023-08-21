<template>
  <Wrapper :isVisible="isVisible">
    <div class="window">
      <div :style="{ backgroundColor: $widjet().global.color }" class="window__header">
        <div class="window__header_title">
          <Icon size="m" icon-name="geo"></Icon>
          <p>{{ titleHeader }}</p>
          <!-- <p>{{ dataWindow.btnText.value }}</p> -->
        </div>
        <Icon size="m" icon-name="arrow" @click="$emit('close')" class="window__header_icon"></Icon>
      </div>
      <div class="window__body">
        <p class="window__body_title">
          {{ title }}
        </p>
        <ul>
          <!-- <li>{{ email }}</li>
          <li>{{ phone }}</li>
          <li>{{ address }}</li>
          <li>{{ address }}</li> -->
          <li v-for="(item, index) in fields" :key="index">
            <div v-if="index !== 'address'" v-for="el in item">
              <Icon size="m" :icon-name="el.iconName"></Icon>  
              <p>{{ el.value }}</p>
            </div>
          </li>
          <!-- <li v-if="fields && fields.address" v-for="(addressItem, addressIndex) in fields.address" :key="addressIndex">
            <p>{{ addressItem }}</p>
          </li> -->

        </ul>
      </div>
      <div class="window__footer"></div>
    </div>
  </Wrapper>
</template>

<script setup>
import Wrapper from './WindowWrapper.vue'
import { ref, defineProps, computed } from "vue";
import Icon from "../Base/Icon.vue";

const props = defineProps({
  isVisible: Boolean,
  windowType: String,
  dataWindow: Object
});

const fields = computed(() => { return props.dataWindow ? props.dataWindow : null });
const titleHeader = computed(() => { return props.dataWindow ? props.dataWindow.btnText : null });
</script>

<style lang="scss" scoped>
.window {
  border-radius: 8px;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 15px 13px;
    width: 300px;
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
    ul {
      li {
        list-style: none;
      }
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