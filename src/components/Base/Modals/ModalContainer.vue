<template>
    <Modal :modal-data="getModalData('form1').value" @close="closeModal('form1')"></Modal>
    <!-- <ImageModal :modal-data="getModalData('catalogMaterial').value" @close="closeModal('catalogMaterial')"></ImageModal>
    <ImageModal :modal-data="getModalData('feedback').value" @close="closeModal('feedback')"></ImageModal>
    <ImageModal :modal-data="getModalData('project').value" @close="closeModal('project')"></ImageModal>
    <TextModal :modal-data="getModalData('politic').value" @close="closeModal('politic')"></TextModal> -->
  </template>
  
  <script>
  import { getModalData, closeModal } from "@/store/modals";
//   import ImageModal from "./../base/modals/ImageModal";
  import Modal from "./Modal.vue";
  
  export default {
    name: "ModalsContainer",
    components: {Modal},
    setup() {
      return {
        getModalData,
        closeModal
      };
    }
  }
  </script>