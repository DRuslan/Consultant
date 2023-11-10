<template>
  <Container :form="form">
    <Field
      class="field"
      v-for="field in getTextFields(form)"
      :key="field"
      :placeholder="field.placeholder"
      v-model="field.value"
      :value="field.value"
      @input="field.errorMessage = ''"
      :errorMessage="field.errorMessage"
      :rules="field.rules"
      :name="field.name"
      :rows="field.rows"
      type="text"
    />
    
    <div class="field-row">
      <Button :active="getBtnActive">Отправить</Button>
      <!-- <button type="submit" :disabled="!checkPolit" :class="getBtnActive"></button> -->
    </div>
    <p class="back" @click="$emit('backStep')">← Выбрать другой мессенджер</p>
    <Political
      class="field__polit"
      tcolor="black"
      lcolor="black"
      chcolor="black"
      @isPolitical="isChecked"
    />
  </Container>
</template>
  
<script setup>
import Container from "./ui/Container.vue";
import Field from "./ui/Field.vue";
import Political from "./ui/Political.vue";
import Button from "../Button.vue";
import { computed, ref, inject } from "vue";

const getTextFields = inject('getTextFields'); // подключаю плагин
const form = ref({
  Name: {
    type: "text",
    name: "Name",
    value: "krible-catalog",
  },
  Phone: {
    type: "tel",
    name: "Телефон",
    placeholder: "Введите ваш телефон",
    value: "",
    rules: ["required", "phone"],
    errorMessage: "",
  },
});

const textFields = ref(getTextFields(form.value)); // делаю реактивным поля из плагина

const getBtnActive = computed(() => {
  for (const field of textFields.value) {
    console.log(field);
    if (field.value.length > 0) {
      return true;
    }
  }
  return false;
});

let checkPolit = ref(true);

function isChecked(value) {
  checkPolit.value = value;
}
</script>
  
<style lang="scss" scoped>
.field {
  margin-bottom: 12px;
  &__polit {
    display: flex;
    justify-content: center;
  }
}
.field-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  button {
    height: 32px;
    background: #5b5b5b;
    color: #fff;
    border: none;
    border-radius: 2px;
    width: 100%;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
.back {
  cursor: pointer;
  font-size: 10px;
  text-align: left;
  margin-bottom: 26px;
  color: #3b6ec7;
}
</style>