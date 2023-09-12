<template>
    <RootModal :modal-active="modalData.isActive" class="image-modal" @close="close">
      <div class="image-modal__container">
        <div class="image-modal__body">
          <div class="image-modal__body__container">
            <div class="image-modal__body__form">
              <!-- <ModalForm :form-name="modalData.formName"></ModalForm> -->
              <div class="image-modal__body__text">
              <p class="text__headline">
                {{ modalData.title !== '' ? modalData.title : "Рассчитать стоимость проекта" }}
              </p>
              <p class="text__subtitle">
                {{ modalData.subTitle !== '' ? modalData.subTitle : "и получите консультацию от наших специалистов" }}
              </p>
            </div>
            </div>
            <div class="image-modal__image">
                <img :src=" modalData.image !== '' ? modalData.image : '/images/modals/1.jpg' " alt="">
            </div>
          </div>
        </div>
      </div>
    </RootModal>
  </template>
  
  <script>
  import RootModal from "./RootModal.vue";
  export default {
    name: "ImageModal",
    components: {RootModal},
    props: {
      modalData: {
        type: Object,
        default: {
          isActive: false,
          title: "Рассчитать стоимость проекта",
          subTitle: "и получите консультацию от наших специалистов",
          image: "/modals/1.jpg",
          formName: "modal-form"
        }
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
    }
  }
  </script>
  
  <style scoped lang="scss">
  .image-modal {
  
    &__container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
  
    //   @include not_small_screen() {
    //     flex-direction: row;
    //   }
    }
  
    &__image {
        width: 180px;
        height: 100%;
        background: red;
        border-radius: 50%;
    @media screen and (min-width: 768px){
        width: 190px;
        height: 195px;
        padding: 10px;
    }
  
      img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
        object-position: center left;
  
        // @include not_small_screen(){
        //   object-position: unset;
        // }
  
        // @include not_middle_screen(){
        //   width: auto;
        //   max-width: 344px;
        // }
      }
    }
  
    &__body {
      width: 100%;
      height: 100%;
      padding: 16px;
      display: flex;
  
    //   @include not_small_screen() {
    //     //padding: 78px 60px 39px 60px;
    //     padding-left: 60px;
    //     padding-right: 60px;
    //   }
  
    //   @include not_large_screen() {
    //     //padding: 79px 72px 63px 110px;
    //     //padding: 79px 68px 63px 118px;
    //     padding-left: 118px;
    //     padding-right: 68px;
    //   }
  
      &__container{
        width: 100%;
        margin: auto;
        display: flex;
  
        // @include not_mobile_screen(){
        //   width: 320px;
        // }
      }
  
      &__text {
        // @include margin-level(violet, margin, bottom);
  
        .text {
          &__headline {
            // @include text_1();
            font-weight: bold;
  
            // @include margin-level(violet, margin, bottom);
          }
  
          &__subtitle {
            // @include text_4();
  
            // @include not_small_screen(){
            //   @include text_3();
            // }
          }
        }
      }
  
      &__form{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  </style>