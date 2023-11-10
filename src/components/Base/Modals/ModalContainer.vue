<template>
    <CallbackModal :modal-data="getModalData('callBack').value" entryData="" @close="closeModal('callBack')" />
    <PolitModal :modal-data="getModalData('politic').value" @close="closeModal('politic')" />
    <ThankModal :modal-data="getModalData('thank').value" :entryData="$widjet().modals.thank" @close="closeModal('thank')"/>
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