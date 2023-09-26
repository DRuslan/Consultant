<template>
    <panel :entry-data="widjetParams"></panel>
</template>

<script>
import panel from './components/Panel.vue';
export default {
  name: 'App',
  components: {panel},
  data() {
    return {
      widjetParams: {}
    }
  },
  created() {
    this.widjetParams =  this.$widjet(window.widjetOuter)
  }
};
</script>
