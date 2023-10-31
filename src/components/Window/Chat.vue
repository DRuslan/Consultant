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
        <div
          class="chat__inner"
          :style="{ color: $widjet().global.textPrimary }"
        >
          <transition-group name="fade">
            <Message
              class="chat__message"
              v-for="item in allMessages"
              :key="item.id"
              :msg="item.message"
              :role="item.role"
            />
          </transition-group>
          <transition name="fade">
            <p class="waiting" v-show="waitResponceBot || ignoreWaiting">
              <span :style="{ color: $widjet().global.dopPrimary }">Артём набирает сообщение </span>
              <span class="waiting__dot" :style="{ backgroundColor: $widjet().global.dopPrimary }"></span>
              <span class="waiting__dot" :style="{ backgroundColor: $widjet().global.dopPrimary }"></span>
              <span class="waiting__dot" :style="{ backgroundColor: $widjet().global.dopPrimary }"></span>
            </p>
          </transition>
        </div>
        <form action="#" @submit="send" @keyup.enter="send" class="chat__form">
          <div class="chat__row">
            <FieldFile
              :title="false"
              :disabled="true"
              :style="{ padding: '0 0 0 10px' }"
            />
            <textarea
              name="message"
              id=""
              cols="30"
              rows="1"
              v-model="newMessage"
            ></textarea>
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
import FieldFile from "../../components/Base/Form/ui/FieldFile.vue";
import Wrapper from "./WindowWrapper.vue";
import Message from "../Base/Chat/Message.vue";
import { ref, defineProps, computed, onMounted } from "vue";

const props = defineProps({
  isVisible: Boolean,
  windowType: String,
  dataWindow: Object,
  figurePos: String,
  positionX: Number,
  script: Object,
});

const newMessage = ref(""); // Реактивная переменная для текстового поля
const allMessages = ref([]); // Реактивная переменная для всех сообщений
const isMessageSend = ref(false); // Реактивная переменная для отслеживания ответа пользователя
const countBotMessages = ref(0); // Количество ответов бота

if (props.script !== null && props.script !== undefined) {
  allMessages.value.push(props.script[countBotMessages.value]);
}

const send = (e) => {
  e.preventDefault();
  // Отправляем сообщение и очищаем текстовое поле
  if (newMessage.value.trim() !== "") {
    allMessages.value.push({
      message: newMessage.value,
      role: "client",
      id: generateUniqueId(),
    });
    newMessage.value = "";
    if (props.script[countBotMessages.value] != null && props.script[countBotMessages.value] !== undefined) {
      setTimeout(function (){
        console.log('isMessageSend.value = true; // Отслеживаем ответ пользователя');
        isMessageSend.value = true; // Отслеживаем ответ пользователя
      }, 1500)
      
    } else {
      isMessageSend.value = false; // отключаем отслеживания так как длина маассива ответов от бота ограничена и если будут обращения то данных не будет
    }
    console.log("Сообщение отправлено пользователем");
    console.log(props.script);
    console.log(props.script[countBotMessages.value]);
    console.log(props.script[countBotMessages.value].ignore);
  }
};

const waitResponceBot = computed(() => {  
    // Проверка на ответ пользователя и количетсво сообщений бота чтобы остановить логику отправки сообщений (так как длина массива ответов от бота огранина)
    if (isMessageSend.value && countBotMessages.value < props.script.length - 1) {
        console.log("Пользователь ждет ответ на сообщение");
        countBotMessages.value++;
        sendBot();
    } else {
      isMessageSend.value = false;
    }
    return isMessageSend.value;
});

let ignoreWaiting = ref(false)
async function sendBot() {
  const delayTimeMessage = props.script[countBotMessages.value].time * 1000; // умножаем на 1000 для получения миллисекунд
  await delaysSendBot(delayTimeMessage);

  // Игнорирование ответов клиента
  if (
    props.script[countBotMessages.value].ignore !== undefined &&
    props.script[countBotMessages.value].ignore
  ) {
    console.log("Игнорирование ответов клиента");
    ignoreWaiting.value = true; // если игнор то точки тоже должны работать 
    console.log(props.script[countBotMessages.value]);

    await delaysSendBot(delayTimeMessage);
    allMessages.value.push(props.script[countBotMessages.value]);
    countBotMessages.value++;
    if (countBotMessages.value < props.script.length) {
      console.log("Отображаем следующее сообщение бота после игнорирования клиента");
      // Вызываем delaysSendBot для следующего сообщения
      await delaysSendBot(delayTimeMessage);
      console.log(props.script[countBotMessages.value]);
      allMessages.value.push(props.script[countBotMessages.value]);
      isMessageSend.value = false;
      ignoreWaiting.value = false;
    } else {
      console.log("Больше сообщений бота нет.");
    }
  } else {
    // отправляем сообщение от (бота)
    console.log("Пользователь получил ответ на сообщение");
    console.log(props.script[countBotMessages.value]);
    allMessages.value.push(props.script[countBotMessages.value]);
    isMessageSend.value = false;
  }

  return countBotMessages.value;
}

function delaysSendBot (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUniqueId() {
  // пробую генерацию id для анимаций групповых сообщений
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
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
  @media screen and (max-width: 576px) {
    width: auto;
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
      padding: 12px 8px;
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

.waiting {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 12px;
  span {
    &:first-child {
      margin-right: 4px;
      font-size: 12px;
    }
  }
  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin: 0 2px;
    animation: bounce 1.2s infinite ease-in-out;  
  
    &:nth-child(2) {
      animation-delay: 0.4s;
    }

    &:nth-child(3) {
      animation-delay: 0.8s;
    }
  }

  
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.4s ease;
}
</style>