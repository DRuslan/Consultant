<template>
    <label
      class="wrapper flex items-center check"
      v-bind:class="{ active: isChecked }"
    >
    
      <slot />
      <input
        class="checkbox"
        type="checkbox"
        :checked="isChecked"
        @change="updateChecked"
      />
      <span class="checkmark"></span>
    </label>
  </template>
  
  <script>
  export default {
    data() {
      return {
          isChecked: true,
      }
    },
    methods: {
      updateChecked () {
          this.isChecked = !this.isChecked;
          this.$emit('isChecked', this.isChecked);
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Customize the label (the wrapper) */
  .wrapper {
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-bottom: 0px;
    cursor: pointer;
    user-select: none;
    color: #000;
  
    span {
      margin: 0 !important;
    }
  
    p {
      color: #000;
      font-weight: normal;
      font-size: 14px;
      line-height: 14px;
      padding-left: 8px;
      margin-top: 3px;
    }
  
    &:hover {
      opacity: 0.67;
    }
  
    &.white {
      .checkmark {
        border-color: #fff;
      }
  
      input:checked ~ .checkmark {
        background-color: transparent !important;
        border-color: #fff !important;
      }
    }
  
    &.black {
      .checkmark {
        border-color: #000;
      }
  
      input:checked ~ .checkmark {
        background-color: transparent !important;
        border-color: #000 !important;
        &::after {
          border-color: #000 !important;
        }
      }
    }
  }
  
  /* Hide the browser's default checkbox */
  .wrapper input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: relative;
    height: 14px;
    width: 14px;
    border-radius: 2px;
    background-color: transparent;
    border: 1px solid #828282;
  }
  /* On mouse-over, add a grey background color */
  // .wrapper:hover input ~ .checkmark {
  //   background-color: $gray-3;
  // }
  /* When the checkbox is checked, add a blue background */
  .wrapper input:checked ~ .checkmark {
    background-color: #007bff;
    border-color: #007bff;
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  /* Show the checkmark when checked */
  
  /* Style the checkmark/indicator */
  .wrapper .checkmark:after {
    left: 4px;
    top: 0px;
    width: 5px;
    height: 9px;
    border: solid #007bff;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .wrapper input:checked ~ .checkmark:after {
    display: block;
    border-color: #fff;
  }
  </style>