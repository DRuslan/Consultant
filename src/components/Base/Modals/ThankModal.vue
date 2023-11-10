<template>
    <RootModal
      :modal-active="modalData.isActive"
      class="thank-modal"
      @close="close"
    >
      <div class="thank-modal__container" :style="{ color: $widjet().global.textPrimary }">
        <img class="thank-modal__img" :src="modalData.image" alt="">
        <div class="thank-modal__body">
          <h2 class="thank-modal__title">{{ modalData.title }}</h2>
          <p class="thank-modal__subtitle">{{ modalData.subTitle }}</p>
        </div>
        <div class="thank-modal__footer" :style="{ backgroundColor: $widjet().global.backAccent }">
            <a @click="close" href="#" class="thank-modal__btn" :style="{ backgroundColor: $widjet().global.dopPrimary }">
                {{ modalData.button.text }}    
            </a>
        </div>
      </div>
    </RootModal>
  </template>
    
    <script>
  import RootModal from "./RootModal.vue";
  
  export default {
    name: "ImageModal",
    components: { RootModal },
    props: {
      modalData: {
        type: Object,
      },
    },
    methods: {
      close() {
        this.$emit("close");
      },
    },
  };
  </script>
    
    <style scoped lang="scss">
  .thank-modal {
    &__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      position: relative;
    }
  
    &__body {
      width: 100%;
      height: 100%;
      padding: 16px;
      padding: 76px 32px 0px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 12px;
      @media screen and (max-width: 768px) {
          flex-direction: column-reverse;
      }
    }

    &__title {
        font-weight: 600;
        margin-bottom: 30px;
        font-size: 24px;
    }

    &__subtitle {
        margin-bottom: 20px;
        font-size: 20px;
    }

    &__img {
        width: 120px;
        height: 120px;
        position: absolute;
        left: calc(50% - 60px);
        top: -60px;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }

    &__btn {
        color: #fff;
        width: 60%;
        text-align: center;
        padding: 12px 0;
        transition: all .3s ease-in-out;
        border-radius: 50px;
        &:hover {
            opacity: .67;
        }
    }
  }
  </style>