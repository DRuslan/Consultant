<template>
  <Container :form="form">
    <Field 
      v-for="field in $getTextFields(form)"
      :key="field"
      class="field" 
      :placeholder="field.placeholder"
      v-model="field.value"
      :value="field.value"
      @input="field.error = ''"
      :errorMessage="field.error"
      :rules="field.rules"
      type="text"
    />
    <TextArea class="field" :placeholder="form.message.placeholder" rows="4" col="3" v-model="form.message.value" />
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
import TextArea from "./ui/Textaria.vue";

const form = ref({
  Phone: {
    type: "text",
    name: "Телефон",
    placeholder: "Введите ваш телефон",
    value: "",
    rules: ["required", "phone"],
    error: "",
  },
  message: {
    type: "textarea",
    name: "Сообщение",
    placeholder: "Ваше сообщение",
    value: "",
    rules: ["required"],
    error: "",
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