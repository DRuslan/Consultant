<template>
  <div class="field">
  <input
    v-if="name === 'Телефон' || name === 'Имя'"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
    class="v-input"
    :class="[
      `v-input__size_${size}`,
      `${isError ? 'v-input__error' : ''}`,
      `${disabled ? 'v-input__disabled' : ''}`,
    ]"
    :disabled="disabled"
  />

  <textarea
    v-if="name === 'Сообщение'"
    :type="type"
    :placeholder="placeholder"
    @input="onInput"
    :value="value"
    :rows="rows"
    :cols="cols"
    class="v-textaria"
    :class="[
      `v-textaria__size_${size}`,
      `${isError ? 'v-textaria__error' : ''}`,
      `${disabled ? 'v-textaria__disabled' : ''}`,
    ]"
  ></textarea>
</div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  value: String,
  placeholder: String,
  type: String,
  name: String,
  size: {
    type: String,
    default: "m",
    validator: (value) => ["s", "m", "l"].indexOf(value) !== -1,
  },
  rows: Number,
  cols: Number,
  rules: {
    type: Array,
    required: false,
    default: [],
  },
  errorMessage: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

let input = ref("");

const isError = computed(() => props.errorMessage.length !== 0); // true обводка на поле при ошибке

const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.v-input {
  display: inline-block;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  color: #000;
  border: 1px solid #8e959b;

  &::placeholder {
    color: gray;
  }

  &__error {
    border-color: red;
  }

  &__disabled {
    cursor: not-allowed;
    background: #8e959b;
    &:hover,
    &:focus {
      border-color: orange;
      background: orange;
    }
  }

  &:focus {
    box-shadow: 0px 0px 5px rgba(56, 169, 240, 0.75);
  }

  &__size_s {
    padding: 7px 16px;
  }

  &__size_m {
    padding: 11px 24px;
  }

  &__size_l {
    padding: 17px 32px;
  }
}

.v-textaria {
  font-size: 14px;
  width: 100%;
  resize: none;
  padding: 11px 24px;
  border-radius: 4px;
  &__error {
    border-color: red;
  }
}
</style>
