<template>
  <RootModal
    :modal-active="modalData.isActive"
    class="image-modal"
    @close="close"
  >
    <div class="image-modal__container">
      <div class="image-modal__body">
        <!-- <div class="image-modal__body__container"> -->
        <div class="image-modal__form" :style="{ color: $widjet().global.color }">
          <!-- <div class="image-modal__body__text" :style="{ color: $widjet().global.color }"> -->
          <p class="image-modal__headline">
            {{
              modalData.title !== ""
                ? modalData.title
                : "Рассчитать стоимость проекта"
            }}
          </p>
          <p class="image-modal__subtitle">
            {{
              modalData.subTitle !== ""
                ? modalData.subTitle
                : "и получите консультацию от наших специалистов"
            }}
          </p>
          <!-- </div> -->
        </div>
        <div class="image-modal__image">
          <img
            :src="
              modalData.image !== '' ? modalData.image : '/images/modals/1.jpg'
            "
            alt=""
          />
        </div>
        <!-- </div> -->
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
      default: {
        isActive: false,
        title: "Рассчитать стоимость проекта",
        subTitle: "и получите консультацию от наших специалистов",
        image: "/modals/1.jpg",
        formName: "modal-form",
      },
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
.image-modal {
  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
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
  }

  &__headline {
      font-weight: bold;
      font-size: 24px;
    }

    &__subtitle {
      font-size: 16px;
    }

    &__form {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 422px;
    }

    &__image {
    width: 180px;
    border-radius: 50%;
    @media screen and (min-width: 768px) {
      width: 190px;
      height: 190px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
      object-position: center left;
    }
  }
}
</style>