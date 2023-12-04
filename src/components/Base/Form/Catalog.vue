<template>
  <Container :form="form" thank="thankCatalog" :goal="goal">
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
      :hidden="field.hidden"
      type="text"
    />
    
    <div class="field-row">
      <Button :active="getBtnActiveClass && checkPolit">
        <template v-slot:left><Icon size="s" iconName="check-circle" /></template> Отправить
      </Button>
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
import Icon from "../Icon.vue";
import { computed, ref, inject, defineProps } from "vue";

const getTextFields = inject('getTextFields'); // подключаю плагины
const getBtnActive = inject('getBtnActive');

const props = defineProps({
  goal: String
});

const form = ref({
  Name: {
    type: "text",
    name: "Name",
    value: "krible-catalog",
    hidden: true
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

const getBtnActiveClass = computed(() => {
  return getBtnActive(textFields.value);
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