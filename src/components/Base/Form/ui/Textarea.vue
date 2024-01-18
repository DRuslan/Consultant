<template>
  <div class="v-textarea-block">
    <div class="file" v-if="file">
      <p class="file__text" :style="{color: $widjet().global.color }">{{ file.split(".")[0] + '.' }}</p>
      <p class="file__type" :style="{color: $widjet().global.color }">{{ file.split(".")[1] }}</p>
      <button class="file__btn" @click="deleteFile"><Icon class="tg-icon" size="s" icon-name="close"></Icon></button>
      <br>
  </div>
  <div
    class="v-textarea"
    contenteditable
    :modelValue="modelValue"
    @input="handleInput"
    @keydown.enter.shift.exact.prevent="handleShiftEnter"
    role="textbox"
    aria-multiline="true"
  >{{ modelValue }}</div>
  </div>
</template>
  
<script setup>
import { computed } from "vue";
import Icon from "../../Icon.vue";

const emit = defineEmits();
const props = defineProps({
  file: String, 
  modelValue: String,
});

function handleInput(event) {
  emit("update:modelValue", event.target.innerText);
}

function deleteFile () {
  emit("delete", true);
}

function fileType () {
  const name = props.file.split(".")[1]
  console.log(name);
  return name;
}

// onMounted(() => {
//   // Инициализируем содержимое contenteditable
//   if (textareaRef.value) {
//     textareaRef.value.innerText = props.newMessage;
//   }
// });

// function handleShiftEnter(event) {
//   // Обработка Shift + Enter

//   if (event.key === "Enter" && event.shiftKey) {
//     console.log("Enter");
//     const input = textareaRef.value;
//     input.insertAdjacentHTML("beforebegin", "<br>");
//     event.preventDefault();
//   }
// }
</script>
  
<style lang="scss" scoped>
.v-textarea {
  width: 100%;
  min-height: 42px;
  color: #000;
  padding: 12px 6px;
  &:focus-visible {
    outline: none !important;
  }
}

.v-textarea-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 233px;
}

.file {
  display: flex;
  align-items: center;
  padding: 8px;
  &__text {
    overflow-x: hidden;
    max-width: 130px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__btn {
    margin-left: 8px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    padding: 0;
    transition: opacity .3s ease-in-out ;
    &:hover {
      opacity: .67;
    }
  }
}
</style>