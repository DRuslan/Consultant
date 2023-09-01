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
  
  <script>
  export default {
    props: {
      size: {
        type: String,
        required: true,
        validator: (value) => ["s", "m", "l"].includes(value),
      },
      value: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: "",
      },
      error: {
        type: Boolean,
        default: false,
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
    },
    methods: {
      onInput(event) {
        this.$emit('update:modelValue', event.target.value);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
      .textaria {
          font-family: 'Montserrat', sans-serif;
          @include text_3;
          width: 100%;
          resize: none;
          padding: 11px 24px;
      } 
  </style>