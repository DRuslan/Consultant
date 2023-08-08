<template>
  <div>
    <h1>Hello, Vue 3 with Webpack 5!</h1>
    <h2>{{ $widjet(widjetParams) }}</h2> 
    <panel></panel>
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
