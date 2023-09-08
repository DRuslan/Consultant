<template>
  <Container>
    <Field class="field" placeholder="Введите ваше имя*"></Field>
    <div class="field-row">
      <button type="submit">Отправить</button>
    </div>
    <Political
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
import { ref } from "vue";

let form = ref({
    phone: {
        value: "",        
    }
})

console.log(form.value);

function isChecked(value) {
    console.log('isChecked ' + value);
    this.checkPolit = value;
}
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