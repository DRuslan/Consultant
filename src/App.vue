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

<template>
  <div class="kreeble">
    <panel :entry-data="widjetParams"></panel>
  </div>
</template>

<style lang="scss" scoped>
  .kreeble {
    background: rgba(183, 14, 14, 0.5);
    position: fixed;
    // height: 100vh;
    // width: 100vw;
    top: 0;
    z-index: 100;
  }
</style>