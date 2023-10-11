<template>
  <Container :form="form">
    <div class="field-row">
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
      <button
        type="submit"
        :style="{
          backgroundColor: $widjet().global.color,
          color: $widjet().global.textSecondary,
        }"
      >
        {{ btnText }}
      </button>
    </div>
  </Container>
</template>
  
  <script setup>
    import { ref } from "vue";
    import Container from "./ui/Container.vue";
    import Field from "./ui/Field.vue";
    const props = defineProps({
      btnText: {
        type: String,
        required: true,
      },
    });
    const form = ref({
      Phone: {
        type: "text",
        name: "Телефон",
        placeholder: "Введите ваш телефон",
        value: "",
        rules: ["required", "phone"],
        errorMessage: "",
      },
    });
</script>
  
  <style lang="scss" scoped>
.field {
  margin-right: 12px;
  max-width: 273px;
}
.field-row {
  display: flex;
  align-items: center;
  button {
    height: 40px;
    border: none;
    width: 137px;
    border-radius: 50px;
    font-size: 14px;
    padding: 0 30px;
  }
}
</style>