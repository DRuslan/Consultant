<template>
  <div class="social">
    <div class="social__item">
      <!-- <Icon size="m" :name="'fields.icon'" /> -->
      <!-- <p>{{ getf.icon }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      required: true,
    },
  },
  mounted () {
    console.log(this.fields);
  }
};
</script>

<!-- <script setup>
import { defineProps, onBeforeMount, ref } from "vue";
import Icon from "./Base/Icon.vue";

const props = defineProps({
  fields: {
    type: Object,
    required: true,
  },
});

const mergedFields = {
  ...props.fields,
}; -->

<!-- // const getFields = ref([]);

// onBeforeMount(() => {
//   getFields.value = props.fields.map(item);
//   console.log(getFields.value);
// }); -->


<!-- </script> -->

<style lang="scss" scoped>
.social {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>