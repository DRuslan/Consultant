<template>
    <div class="v-polit" :class="[`v-polit__${tcolor}`]">
      <check :class="[`${chcolor}`]" @isChecked="isCheckedPolit"></check>
      <small>
        Я принимаю политику обработки
        <a class="v-link" :class="[`v-link__${lcolor}`]" @click.prevent="openPoliticalModal()">
          персональных данных
        </a>
      </small>
    </div>
  </template>
  
  <script>
  import Check from "./Check.vue";
  import { openModal } from "../../../../store/modals";
  export default {
    components: {Check},
    setup() {
      return {
        // openModal
      };
    },
    data() {
      return {
          politValue: true
      }
    },
    props: {
      tcolor: {
        type: String,
        required: true,
        default: "black",
        validator: (value) => ["white", "black", "green"].indexOf(value) !== -1,
      },
      lcolor: {
        type: String,
        required: true,
        validator: (value) => ["white", "black", "green"].indexOf(value) !== -1,
      },
      chcolor: {
        type: String,
        required: true,
        validator: (value) => ["white", "black", "green"].indexOf(value) !== -1,
      },
    },
    methods: {
      isCheckedPolit (val) {
          this.politValue = val;
          this.$emit('isPolitical', this.politValue);
      },
      openPoliticalModal () {
        console.log("openModal('politic')");
        openModal('politic');
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .v-polit {
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 480px) {
        align-items: center;
    }   
     
    small {
      cursor: pointer;
      font-size: 8px;
    }
  
    &__white {
      color: #fff;
      small {
        color: #fff;
      }
    }
    &__black {
      color:#000;
      small {
        color:#000;
      }
    }
  
    .v-link {
      text-decoration: underline;
      font-size: 8px;
      padding: 0px !important;
      transition: all .3s ease-in-out;
      &:hover {
        opacity: .67;
      }
      &__white {
        color: #fff;
      }
      &__black {
        color:#000;
      }
    }
  
    small {
      margin-left: 8px;
      line-height: 14px;
      text-align: left;
    }
  }
  </style>