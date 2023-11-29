<template>
  <div
    class="msg"
    :class="[{ msg__bot: role === 'bot' }, { msg__client: role === 'client' }]"
  >
    <div v-if="role === 'bot'" class="msg__img">
      <img :src="managerImage" alt="" />
    </div>
    <div class="msg__inner">
      <div class="msg__created"><small>{{ formattedTimeAgo }}</small></div>
      <div :class="[{ msg__bot_message: role === 'bot' }, { msg__client_message: role === 'client' }]">
        <p>{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

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
  createdAt: {
    type: Object,
  },
  managerImage: {
    type: String,
  },
});

const formattedTimeAgo = ref(""); // Инициализируем значение

// Функция, которая будет вызываться каждую минуту
const updateFormattedTimeAgo = () => {
  formattedTimeAgo.value = calculateTimeAgo();
};

// Вызываем функцию каждую минуту
setInterval(updateFormattedTimeAgo, 60000);

// Вызываем функцию при создании компонента
updateFormattedTimeAgo();

function calculateTimeAgo() {
  const currentTime = new Date();
  const messageTime = new Date(props.createdAt);
  const timeDifference = Math.floor((currentTime - messageTime) / 1000);

  if (timeDifference < 60) {
    return 'Только что';
  } else if (timeDifference < 1800) {
    const minutesAgo = Math.floor(timeDifference / 60);
    return `${minutesAgo} минут${getMinutesSuffix(minutesAgo)} назад`;
  } else {
    return 'Давно';
  }
}

// склонения времени
function getMinutesSuffix(minutes) {
  if (minutes >= 11 && minutes <= 19) {
    return '';
  } else {
    const lastDigit = minutes % 10;
    switch (lastDigit) {
      case 1:
        return 'у';
      case 2:
      case 3:
      case 4:
        return 'ы';
      default:
        return '';
    }
  }
}
</script>

<style lang="scss" scoped>
.msg {
  position: relative;
  p {
    font-size: 12px !important;
    line-height: 18px !important;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  &__created {
    margin-bottom: 5px;
    position: absolute;
    bottom: -20px;
    right: 0;
    white-space: nowrap;
    opacity: .5;
    small {
      font-size: 11px !important;
    }
  }
  &__bot {
    display: flex;
    // justify-content: space-between;
    align-self: flex-start;
    width: 100%;
    &_message {
      background-color: #fff;
      position: relative;
      border-radius: 0 8px 8px 8px;
      padding: 12px;
      margin-left: 12px;
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