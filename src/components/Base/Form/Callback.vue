<template>
    <Container>
      <div class="field-row">
        <Field class="field" placeholder="Введите ваше имя*"></Field>
        <button type="submit" :style="{ backgroundColor: $widjet().global.color, color: $widjet().global.textSecondary }">{{ btnText }}</button>
      </div>
    </Container>
  </template>
  
  <script setup>
  import Container from './ui/Container.vue';
  import Field from './ui/Field.vue';
  const props = defineProps({
    btnText: {
        type: String,
        required: true,
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