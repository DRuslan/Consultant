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
    contenteditable="true"
    :modelValue="modelValue"
    @input="handleInput"
    @keydown.enter.shift.exact.prevent="handleShiftEnter"
    role="textbox"
    aria-multiline="true"
    ref="textareaRef"
  >{{ modelValue }}</div>
  </div>
</template>
  
<script setup>
import { ref, watchEffect } from "vue";
import Icon from "../../Icon.vue";

const emit = defineEmits();
const props = defineProps({
  file: String, 
  modelValue: String,
});

const textareaRef = ref(null);

function handleInput(event) {
  setEndOfContenteditable(textareaRef.value);
  emit("update:modelValue", event.target.innerText);
}

function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange) {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Создаем и вставляем текстовый узел в конец contentEditable элемента
        var textNode = document.createTextNode('\u200B'); // нулевой пробел
        contentEditableElement.appendChild(textNode);

        // Перемещаем каретку в созданный узел
        range = document.createRange();
        range.setStart(textNode, 1);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        // Удаляем временно вставленный текстовый узел
        contentEditableElement.removeChild(textNode);
    } else if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}


function deleteFile () {
  emit("delete", true);
}

function fileType () {
  const name = props.file.split(".")[1]
  console.log(name);
  return name;
}
</script>
  
<style lang="scss" scoped>
[contenteditable] {
    -webkit-user-select: text;
    user-select: text;
}

.v-textarea {
  width: 100%;
  min-height: 42px;
  color: #000;
  padding: 12px 6px;
  -webkit-user-select: text;
    user-select: text;
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