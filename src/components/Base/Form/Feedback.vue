<template>
  <Container :form="form" :goal="goal" thank="thankMail" :dopFields="$widjet() ? $widjet().global.data : null">
    <Field
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
      <FieldFile v-model:file="form.File.value" :disabled="true" />
      <Button :active="getBtnActiveClass">Отправить</Button>
    </div>
  </Container>
</template>

<script setup>
import { ref, inject, computed, defineProps } from "vue";
import Container from "./ui/Container.vue";
import Button from "../Button.vue";
import Field from "./ui/Field.vue";
import FieldFile from "./ui/FieldFile.vue";

const getTextFields = inject('getTextFields'); // подключаю плагин
const getBtnActive = inject('getBtnActive');

const props = defineProps({
  goal: String
});

const form = ref({
  Name: {
    type: "text",
    name: "Name",
    value: "krible-fast-mail",
    hidden: true
  },
  Email: {
    type: "text",
    name: "Почта",
    placeholder: "Ваш e-mail*",
    value: "",
    rules: ["required", "email"],
    errorMessage: "",
  },
  Comment: {
    type: "text",
    name: "Сообщение",
    placeholder: "Ваше сообщение",
    value: "",
    rules: ["required"],
    errorMessage: "",
    rows: 7
  },
  File: {
    type: "file",
    name: "File",
    placeholder: "",
    value: "",
    rules: [],
    errorMessage: "",
  }
});

const textFields = ref(getTextFields(form.value)); // делаю реактивным поля из плагина

const getBtnActiveClass = computed(() => {
  return getBtnActive(textFields.value);
});


</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 12px;
}
.field-row {
  display: flex;
  justify-content: space-between;
  button {
    height: 32px;
    background: gray;
    color: #fff;
    border: none;
  }
}
</style>