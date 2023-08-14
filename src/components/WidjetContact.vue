<template>
  <div class="social">
    <div class="social__item">
      <!-- <Icon size="m" :name="toRefs(getIcon())" /> -->
      <p>{{ fields.icon }}</p>
    </div>
  </div>
</template>

<!-- <script>
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
</script> -->

<script setup>
import { defineProps, onBeforeMount, ref, toRefs } from "vue";
import Icon from "./Base/Icon.vue";

const props = defineProps({
  fields: {
    type: Object,
    required: true,
  },
});

// console.log(fields);

// function getIcon () {
//   console.log(props.fields.icon);
//   // console.log(typeof props.fields.icon);
//   // return props.fields.icon;
// }
</script>


<style lang="scss" scoped>
.social {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>