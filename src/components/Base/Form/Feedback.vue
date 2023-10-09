<template>
  <Container>
    <Field 
      v-for="field in getTextFields()"
      class="field" 
      :placeholder="form.Phone.placeholder"
      v-model="form.value"
      :value="form.value"
      @input="form.error = ''"
      :rules="form.rules"
    />
    <TextArea class="field" placeholder="Ваше сообщение*" rows="4" col="3" />
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
import getTextFields from "../../../plugin/formsHelper.js";

const form = ref({
  FIO: {
    type: "text",
    name: "Имя",
    placeholder: "Введите ваш телефон",
    value: "",
    rules: ["required"],
    error: "",
  },
  Phone: {
    type: "text",
    name: "Телефон",
    placeholder: "Введите ваш телефон",
    value: "",
    rules: ["required", "phone"],
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