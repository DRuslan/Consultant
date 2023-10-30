<template>
  <div
    class="col col__hr"
    v-if="visibleDevice"
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
        { col__container_l: size === 'l' },
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  hr: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'm',
    validator: (value) => ["s", "m", "l"].includes(value),
  },
  visibility: {
    type: Object
  },
  windowWidth: Number
});

// const widthDevice = ref(window.innerWidth);
const visibleDevice = computed(() => {
  let isVisible = false; // Флаг, который показывает, виден ли блок в одном из брейкпоинтов
  for (let breakpoint in props.visibility) {
    if (props.visibility[breakpoint] === true && props.windowWidth >= breakpoint) {
      isVisible = true;
      break;
    } else {
      isVisible = false;
    }
  }

  return isVisible; // Возвращаем флаг видимости блока
});

// // Добавляем слушатель события resize при монтировании компонента
// onMounted(() => {
//   window.addEventListener('resize', handleResize);
// });

// // Удаляем слушатель события resize перед уничтожением компонента
// onBeforeUnmount(() => {
//   window.removeEventListener('resize', handleResize);
// });

// // Функция, которая будет вызываться при изменении размера окна
// function handleResize() {
//   widthDevice.value = window.innerWidth; // Обновляем значение widthDevice при изменении размера окна
// }

</script>

<style lang="scss" scoped>
.col {
  width: auto;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  &_left {
    // margin-left: auto
    display: flex;
    justify-content: flex-end;
  }
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
    // width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 30px;
    &_s {
      padding-left: 0px;
      padding-right: 0px;
      max-width: 70px;
    }

    &_m {
      padding-left: 40px;
      padding-right: 40px;
      @media screen and (max-width: 480px) {
        padding: 0 20px;
      }
    }

    &_l {
      @media screen and (min-width: 1024px) {
        min-width: 300px; 
      }
    }
  }
}
</style>