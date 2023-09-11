<template>
  <Container>
    <Field class="field" placeholder="Введите ваше имя*"></Field>
    <div class="field-row">
      <button type="submit" :disabled="!checkPolit">Отправить Сюда</button>
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
import { ref } from "vue";

let form = ref({
    phone: {
        value: "",        
    }
})

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
    transition: all .3s ease-in-out;
    &:disabled {
      opacity: .4;
      cursor: not-allowed;
    }
  }
}

.back {
  cursor: pointer;
  font-size: 10px;
  text-align: left;
  margin-bottom: 26px;
  color: #3B6EC7;
}
</style>