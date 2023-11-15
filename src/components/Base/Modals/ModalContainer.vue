<template>
    <CallbackModal :modal-data="getModalData('callBack').value" @close="closeModal('callBack')" />
    <PolitModal :modal-data="getModalData('politic').value" @close="closeModal('politic')" />
    <ThankModal :modal-data="getModalData('thank').value" @close="closeModal('thank')"/>
    <ThankModal :modal-data="getModalData('thankCatalog').value" @close="closeModal('thankCatalog')"/>
    <ThankModal :modal-data="getModalData('thankMail').value" @close="closeModal('thankMail')"/>
  </template>
  
  <script>
  import { getModalData, closeModal } from "@/store/modals";
  import PolitModal from "./PolitModal.vue";
  import CallbackModal from "./CallbackModal.vue";
  import ThankModal from './ThankModal.vue';
  
  export default {
    name: "ModalsContainer",
    components: {CallbackModal, PolitModal, ThankModal},
    setup() {
      return {
        getModalData,
        closeModal
      };
    },
  }
  </script>