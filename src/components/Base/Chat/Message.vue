<template>
  <div
    class="msg"
    :class="[{ msg__bot: role === 'bot' }, { msg__client: role === 'client' }]"
  >
    <div v-if="role === 'bot'" class="msg__img">
      <img src="../../../images/content/manager.png" alt="" />
    </div>
    <div :class="[{ msg__bot_message: role === 'bot' }, { msg__client_message: role === 'client' }]">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  msg: {
    type: String,
    default: "bot",
  },
  type: {
    type: String,
    default: "String",
  },
  role: {
    type: String,
    required: true,
    default: "bot",
    validator: (value) => ["bot", "client"].includes(value),
  },
});
</script>

<style lang="scss" scoped>
.msg {
  &__bot {
    display: flex;
    justify-content: space-between;
    align-self: flex-start;
    width: 100%;
    &_message {
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

  &__img {
    img {
      width: 41px;
      height: 41px;
      border-radius: 50%;
    }
  }

  &__client {
    align-self: flex-end;
    position: relative;
    padding-right: 10px;
    opacity: 1;
    &:after {
      content: "";
      position: absolute; /* Абсолютное позиционирование */
      right: 0px;
      bottom: 5px; /* Положение треугольника */
      border: 10px solid transparent; /* Прозрачные границы */
      border-top: 10px solid #d8e1ea; /* Добавляем треугольник */
      transform: rotate(135deg);
    }
    &_message {
      width: 100%;
      background-color: #d8e1ea;
      padding: 12px;
      border-radius: 12px;
      border-bottom-right-radius: 0;
      max-width: 218px;
      padding-right: 10px;
    }
  }
}
</style>