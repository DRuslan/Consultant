<template>
  <Container :form="form">
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
      type="text"
    />
    <div class="field-row">
      <FieldFile />
      <Button :active="getBtnActive">Отправить</Button>
    </div>
  </Container>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import Container from "./ui/Container.vue";
import Button from "../Button.vue";
import Field from "./ui/Field.vue";
import FieldFile from "./ui/FieldFile.vue";

const getTextFields = inject('getTextFields'); // подключаю плагин
const form = ref({
  email: {
    type: "text",
    name: "Почта",
    placeholder: "Ваш e-mail*",
    value: "",
    rules: ["required", "email"],
    errorMessage: "",
  },
  message: {
    type: "text",
    name: "Сообщение",
    placeholder: "Ваше сообщение",
    value: "",
    rules: ["required"],
    errorMessage: "",
    rows: 7
  },
});

const textFields = ref(getTextFields(form.value)); // делаю реактивным поля из плагина

const getBtnActive = computed(() => {
  for (const field of textFields.value) {
    if (field.value.length > 0) {
      return true;
    }
  }
  return false;
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