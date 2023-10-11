<template>
  <Container :form="form">
    <Field
      v-for="field in $getTextFields(form)"
      :key="field"
      :placeholder="field.placeholder"
      v-model="field.value"
      :value="field.value"
      @input="field.errorMessage = ''"
      :errorMessage="field.errorMessage"
      :rules="field.rules"
      :name="field.name"
      type="text"
    />
    <div class="field-row">
      <FieldFile />
      <button type="submit">Отправить</button>
    </div>
  </Container>
</template>

<script setup>
import { ref } from "vue";
import Container from "./ui/Container.vue";
import Field from "./ui/Field.vue";
import FieldFile from "./ui/FieldFile.vue";

const form = ref({
  Phone: {
    type: "text",
    name: "Телефон",
    placeholder: "Введите ваш телефон",
    value: "",
    rules: ["required", "phone"],
    errorMessage: "",
  },
  message: {
    type: "text",
    name: "Сообщение",
    placeholder: "Ваше сообщение",
    value: "",
    rules: ["required"],
    errorMessage: "",
  },
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