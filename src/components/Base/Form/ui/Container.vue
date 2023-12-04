<template>
  <div class="form-container">
    <form class="v-form" @submit.prevent="composableForm.send">
      <slot></slot>
    </form>
  </div>
</template>

<script setup>
import useForm from '../../../../composables/useForm'
import { defineProps } from 'vue';

const props = defineProps({
  thank: String,
  form: {
    type: Object,
    required: true,
  },
  goal: String,
});
const composableForm = useForm(props.form, props.thank, props.goal);
</script>

<style>
</style>