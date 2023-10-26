<template>
  <RootModal
    :modal-active="modalData.isActive"
    class="image-modal"
    @close="close"
  >
    <div class="image-modal__container">
      <div class="image-modal__body" :style="{ color: $widjet().global.textPrimary }">
        <div class="image-modal__inner">
          <p class="image-modal__headline">
            {{ modalData.title !== "" ? modalData.title : "Рассчитать стоимость проекта"}}
          </p>
          <CallbackForm class="image-modal__form" :btnText="modalData.button.text"/>
          <p class="image-modal__subtitle">
            {{ modalData.subTitle !== "" ? modalData.subTitle : "и получите консультацию от наших специалистов"}}
          </p>
          <a href="#" class="image-modal__political" :style="{ color: $widjet().global.dopPrimary }" @click.prevent="openPoliticalModal">Пользовательское соглашение</a>
        </div>
        <div class="image-modal__image">
          <p class="image-modal__headline mobile">{{modalData.title !== "" ? modalData.title : "Рассчитать стоимость проекта"}}</p>
          <img :src="modalData.image !== '' ? modalData.image : '/images/modals/1.jpg'" alt=""/>
        </div>
      </div>
    </div>
  </RootModal>
</template>
  
  <script>
import RootModal from "./RootModal.vue";
import CallbackForm from "../Form/Callback.vue";
import {openModal} from "../../../store/modals";

export default {
  name: "ImageModal",
  components: { RootModal, CallbackForm },
  props: {
    modalData: {
      type: Object,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    openPoliticalModal () {
      openModal('politic');
    }
  },
};
</script>
  
  <style scoped lang="scss">
.image-modal {
  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
  }

  &__body {
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
    }
  }

  &__inner {
    width: 463px;
  }

  &__headline {
    font-weight: bold;
    font-size: 24px;
    @media screen and (max-width: 768px) {
      display: none;
    }
    &.mobile {
      display: block;
      @media screen and (min-width: 768px) {
        display: none;
      } 
    }
  }

  &__subtitle {
    font-size: 16px;
    margin-top: 30px;
  }

  &__political {
    font-size: 14px;
    transition: all .3s ease-in-out;
    margin-top: 30px;
    display: inline-block;
    &:hover {
        opacity: .67;
    }
  }

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
  }

  &__image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      max-width: 180px;
      max-height: 180px;
      border-radius: 50%;
      border-radius: inherit;
      object-fit: cover;
      object-position: center left;
    }
  }
}
</style>