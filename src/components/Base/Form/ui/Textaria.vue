<template>
  <textarea
    @input="onInput"
    :value="value"
    :rows="rows"
    :cols="cols"
    :placeholder="placeholder"
    class="textaria"
    :class="[
      `textaria__size_${size}`,
      `${error ? 'input__error' : ''}`,
      `${disabled ? 'input__disabled' : ''}`,
    ]"
  />
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
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },

  rows: {
    type: Number,
    default: 4,
  },
  cols: {
    type: Number,
    default: 30,
  },
});

const isError = computed(() => {
  if (props.errorMessage.length !== 0) {
    return true;
  }
});

const emit = defineEmits(["update:modelValue"]);

let input = ref("");

const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
  
  <style lang="scss" scoped>

</style>