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
          ref="chatContainerRef"
        >
          <transition-group name="fade">
            <Message
              class="chat__message"
              v-for="item in Chat"
              :key="item.id"
              :msg="item.message"
              :role="item.role"
              :created-at="item.createdAt"
              :manager-image="dataWindow.window.body.img"
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
import { ref, defineProps, computed, watchEffect, nextTick } from "vue";
import axios from "axios";

const props = defineProps({
  isVisible: Boolean,
  windowType: String,
  dataWindow: Object,
  figurePos: String,
  positionX: Number,
  script: Object,
});

const newMessage = ref(""); // Реактивная переменная для текстового поля
const Chat = ref([]); // Реактивная переменная для всех сообщений
const isMessageSend = ref(false); // Реактивная переменная для отслеживания ответа пользователя
const countBotMessages = ref(0); // Количество ответов бота
const chatContainerRef = ref(null); // Для отслеживания высоты чата и его скролла
const createdAtMessageRef = ref(new Date()); // Реактивная переменная для отслеживания когда создано сообщение

if (props.script !== null && props.script !== undefined) {
  const messageBotScript = props.script[countBotMessages.value]; // Сообщение от бота в скрипте
  Chat.value.push({
    ...messageBotScript, 
    createdAt: new Date()
  });
  console.log(Chat.value);
}

const send = (e) => {
  e.preventDefault();
  // формируем данные для отправки
  const formData = new FormData(); // Constructor JS (Form building)
  formData.append("Site", location.href);
  formData.append("Name", "krible-chat");
  // Отправляем сообщение и очищаем текстовое поле
  if (newMessage.value.trim() !== "") {
    Chat.value.push({
      id: generateUniqueId(),
      createdAt: new Date(),
      message: newMessage.value,
      role: "client",
    });

    formData.append("Chat", JSON.stringify(Chat.value)); // подмешиваем данные с всего чата
    axios.post('/api/send-chat', formData,
    { 
      withCredentials: true, 
      // headers : {
      //   Cookie: "visit_id=1111",
      // }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })

    newMessage.value = "";
    if (props.script[countBotMessages.value] != null && props.script[countBotMessages.value] !== undefined) {
      setTimeout(function (){
        console.log('isMessageSend.value = true; // Отслеживаем ответ пользователя');
        isMessageSend.value = true; // Отслеживаем ответ пользователя
      }, 1500)
      
    } else {
      isMessageSend.value = false; // отключаем отслеживания так как длина маассива ответов от бота ограничена и если будут обращения то данных не будет
    }
    scrollLastMessage();
    console.log("Сообщение отправлено пользователем");
  }
};

const waitResponceBot = computed(() => {  
    // Проверка на ответ пользователя и количетсво сообщений бота чтобы остановить логику отправки сообщений (так как длина массива ответов от бота огранина)
    if (isMessageSend.value && countBotMessages.value < props.script.length - 1) {
        // console.log("Пользователь ждет ответ на сообщение");
        countBotMessages.value++;
        sendBot();
    } else {
      isMessageSend.value = false;
    }
    return isMessageSend.value;
});

let ignoreWaiting = ref(false)
async function sendBot() {
  const delayTimeMessage = props.script[countBotMessages.value].delay * 1000; // умножаем на 1000 для получения миллисекунд
  await delaysSendBot(delayTimeMessage);
  // Игнорирование ответов клиента
  if (props.script[countBotMessages.value].ignore !== undefined && props.script[countBotMessages.value].ignore) {
    console.log("Игнорирование ответов клиента");
    ignoreWaiting.value = true; // если игнор то точки тоже должны работать 
    
    await delaysSendBot(delayTimeMessage);
    Chat.value.push({
      ...props.script[countBotMessages.value],
      createdAt: new Date()
    });
    countBotMessages.value++;
    if (countBotMessages.value < props.script.length) {
      console.log("Отображаем следующее сообщение бота после игнорирования клиента");
      // Вызываем delaysSendBot для следующего сообщения
      await delaysSendBot(delayTimeMessage);

      Chat.value.push({
        ...props.script[countBotMessages.value],
        createdAt: new Date()
      });
      isMessageSend.value = false;
      ignoreWaiting.value = false;
      scrollLastMessage();
    } else {
      console.log("Больше сообщений бота нет.");
    }
  } else {
    // отправляем сообщение от (бота)
    console.log("Пользователь получил ответ на сообщение");
    Chat.value.push({
      ...props.script[countBotMessages.value],
      createdAt: new Date()
    });
    isMessageSend.value = false;
    scrollLastMessage();
  }

  return countBotMessages.value;
}

function delaysSendBot (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollLastMessage () {
  // Следим за изменениями во всех сообщениях и прокручиваем вниз 
  watchEffect(() => {
    nextTick(() => {
      scrollToBottom();
    });
  });
}

// Функция прокрутки вниз
function scrollToBottom() {
  const chatContainer = chatContainerRef.value;
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

function generateUniqueId() {
  // пробую генерацию id для анимаций групповых сообщений
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// setInterval(function (){
//   createdAtMessageRef.value = new Date(); // обновляем время создания сообщения
// }, 60000);
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
  height: 400px;
  justify-content: space-between;
  &__inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // min-height: 250px;
    // max-height: 365px;
    padding: 24px 6px 16px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__message {
    max-width: 270px;
    margin-bottom: 30px;
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