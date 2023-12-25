<template>
  <!-- <div
    class="v-textarea"
    contenteditable
    @input="handleInput"
    @keydown.enter.shift.exact.prevent="handleShiftEnter"
    ref="textareaRef"
    role="textbox"
    aria-multiline="true"
  ></div> -->
  <div
    class="v-textarea"
    contenteditable
    :modelValue="modelValue"
    @input="handleInput"
    @keydown.enter.shift.exact.prevent="handleShiftEnter"
    role="textbox"
    aria-multiline="true"
  >{{ modelValue }}</div>
  <div class="file" style="color: red">
    {{ file }}
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from "vue";
const emit = defineEmits();
const props = defineProps({
  file: String,
  modelValue: String
});

function handleInput(event) {
  emit("update:modelValue", event.target.innerText);
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
</style>