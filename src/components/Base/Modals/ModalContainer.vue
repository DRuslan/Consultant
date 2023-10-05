<template>
    <CallbackModal :modal-data="getModalData('callBack').value" entryData="" @close="closeModal('callBack')" />
    <PolitModal :modal-data="getModalData('politic').value" @close="closeModal('politic')" />
  </template>
  
  <script>
  import { getModalData, closeModal } from "@/store/modals";
  import PolitModal from "./PolitModal.vue";
  import CallbackModal from "./CallbackModal.vue";
  
  export default {
    name: "ModalsContainer",
    components: {CallbackModal, PolitModal},
    setup() {
      return {
        getModalData,
        closeModal
      };
    },
  }
  </script>