<template>
    <RootModal
      :modal-active="modalData.isActive"
      class="text-modal"
      @close="close"
    >
      <div class="text-modal__container">
        <div class="text-modal__main" v-html="modalData.text" :style="{ color: $widjet().global.textPrimary }"></div>
      </div>
    </RootModal>
  </template>
  
  <script>
  import RootModal from "./RootModal.vue";
  export default {
    name: "PolitModal",
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
  .text-modal {
    &__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 24px;
    }
  
    &__main {
        height: 100%;
        overflow: scroll;
        font-size: 14px;
    }
  }
  </style>