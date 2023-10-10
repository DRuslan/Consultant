<template>
  <!-- <input
    class="v-input"
    :value="value"
    @input="onInput"
    :type="type"
    :placeholder="placeholder"
    :class="[
      `v-input__size_${size}`,
      `${isError ? 'v-input__error' : ''}`,
      `${disabled ? 'v-input__disabled' : ''}`,
    ]"
    :disabled="disabled"
  /> -->
  <input
    class="v-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
    :class="[
      `v-input__size_${size}`,
      `${isError ? 'v-input__error' : ''}`,
      `${disabled ? 'v-input__disabled' : ''}`,
    ]"
    :disabled="disabled"
  />
  {{ getMessage }}
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  value: String,
  placeholder: String,
  type: String,
  size: {
    type: String,
    default: "m",
    validator: (value) => ["s", "m", "l"].indexOf(value) !== -1,
  },
  rules: {
    type: Array,
    required: false,
    default: [],
  },
  errorMessage: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

let input = ref("");

// const isError = computed(() => {
//   return input.value === "" ? true : false;

// });
console.log(props.errorMessage);

const getMessage = computed(() => {
  return props.errorMessage;
});

const isError = computed(() => {
  return props.errorMessage.length !== 0;
});

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
  border: 1px solid #000;

  &::placeholder {
    color: gray;
  }

  &__error {
    border-color: red;
  }

  &__disabled {
    border-color: blue;
    background: blue;

    &:hover,
    &:focus {
      border-color: orange;
      background: orange;
    }
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
</style>
