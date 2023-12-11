<template>
  <div class="form-container">
    <form class="v-form" @submit.prevent="composableForm.send">
      <slot></slot>
    </form>
  </div>
</template>

<script setup>
import useForm from '../../../../composables/useForm'
import { defineProps, ref } from 'vue';

const props = defineProps({
  thank: String,
  form: {
    type: Object,
    required: true,
  },
  goal: String,
  dopFields: {
    type: Object,
    default: null
  }
});

const globalParamsForm = ref(props.dopFields);
const composableForm = useForm(props.form, props.thank, props.goal, globalParamsForm.value);
</script>

<style>
</style>