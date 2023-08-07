<template>
  <div>
    <h1>Hello, Vue 3 with Webpack 5!</h1>
    <h2>{{ $widjet(widjetParams) }}</h2>
    <div class="widjet">
      <a class="widjet__link" href="#">Krible</a>
      <a class="widjet__link" href="#">Krible</a>
      <div class="widjet__inner">

      </div>
    </div>
    <panel />
  </div>
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
  mounted() {
    this.widjetParams = window.widjetOuter
  }
};
</script>

<style lang="scss" scoped>
  .widjet {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: red;
  }
</style>