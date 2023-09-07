<template>
  <Container>
    <Field class="field" placeholder="Введите ваше имя*"></Field>
    <TextArea class="field" placeholder="Ваше сообщение*" rows="4" col="3"/>
    <div class="field-row">
      <FieldFile/>
      <button type="submit">Отправить</button>
    </div>
  </Container>
</template>

<script setup>
import Container from './ui/Container.vue';
import Field from './ui/Field.vue';
import FieldFile from './ui/FieldFile.vue';
import TextArea from './ui/Textaria.vue';

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