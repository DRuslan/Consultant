<template>
  <div
    class="col col__hr"
    :class="[
      { col__hr_right: hr === 'right' },
      { col__hr_left: hr === 'left' },
      { col_left: hr === 'left' },
      { col_right: hr === 'right' },
    ]"
  >
    <div
      class="col__container"
      :class="[
        { col__container_s: size === 's' },
        { col__container_m: size === 'm' },
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  hr: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'm',
    validator: (value) => ["s", "m"].includes(value),
  }
});
</script>

<style lang="scss" scoped>
.col {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  &_left {margin-left: auto}
  &_right {margin-right: initial;}
  &__hr {
    &::before {
      content: "";
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: #15469b;
      top: 0px;
    }
  }

  &__hr_left {
    &::before {
      left: 0;
    }
  }
  &__hr_right {
    &::before {
      right: 0px;
    }
  }

  &__container {
    height: 100%;
    cursor: pointer;
    &_s {
      padding-left: 0px;
      padding-right: 0px;
    }

    &_m {
      padding-left: 40px;
      padding-right: 40px;
    }
  }
}
</style>