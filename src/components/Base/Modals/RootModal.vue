<template>
    <transition name="modal-animation">
      <div v-show="modalActive" class="cons-modal" @keydown.esc="close" @click.self="close" tabindex="0">
        <transition name="modal-animation-inner" :class="[`cons-modal__radius_${size}`]">
          <div v-show="modalActive" class="cons-modal__inner" :class="[`cons-modal__size_${size}`]">
            <div class="cons-modal__close" @click="close">
              <Icon size="m" icon-name="close" />
            </div>
            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script>
  import Icon from "../../Base/Icon.vue";
  export default {
    components: {Icon},
    props: {
      modalActive: {
        type: Boolean,
        required: true,
      },
      radius: {
        type: String,
        default: 'm',
        validator: (value) => ['s', 'm', 'l'].indexOf(value) !== -1,
      },
      size: {
        type: String,
        default: 'm',
        validator: (value) => ['s', 'm', 'l'].indexOf(value) !== -1,
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
      focusElement(el) {
        if (el && typeof el.focus === "function") {
          el.focus();
        }
      },
    },
    watch: {
      modalActive(value) {
        if (value) {
          this.show = true;
          this.$nextTick(() => {
            this.focusElement(this.$refs.modalBody);
          });
          setTimeout(() => {
            document.body.style.overflow = "hidden";
          }, 0);
        }
  
        if (!value) {
          document.body.style.overflow = "";
          setTimeout(() => {
            this.show = false;
          }, 200);
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .cons-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  
    &__close {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 18px;
      height: 18px;
      font-size: 20px;
      cursor: pointer;
      transition: all .3s linear;
      color: #8E959B;
      // color: $gray;
  
      svg {
        fill: currentColor;
        transition: all .3s linear;
      }
  
      // &:hover{
      //   color: $antracit;
      // }
    }
  
    &__inner {
      position: relative;
      width: 750px;
      min-width: 300px;
      max-width: 90%;
      // height: 65%;
      min-height: 300px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      background-color: #fff;
      display: flex;
      flex-direction: row;
  
      // @include not_small_screen(){
      //   height: 480px;
      //   width: 80%;
  
      //   min-width: unset;
      //   min-height: unset;
      // }
  
      // @include not_middle_screen(){
      //   width: 80%;
      //   max-width: 860px;
      //   // height: 60%;
      //   max-height: 480px;
      // }
    }
  
    &__size_m {
      //max-width: 736px;
    }

    &__radius_m {
      border-radius: 12px;
    }
  }
  
  .modal-animation-enter-active,
  .modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  .modal-animation-enter-from,
  .modal-animation-leave-to {
    opacity: 0;
  }
  .modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  .modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  .modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  .modal-animation-inner-leave-to {
    transform: scale(0.8);
  }
  </style>
  