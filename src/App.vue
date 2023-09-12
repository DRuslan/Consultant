<template>
  <div>
    <h1>Hello, Vue 3 with Webpack 5!</h1>
    <!-- <h2>{{ widjetParams }}</h2>  -->
    <panel :entry-data="widjetParams"></panel>
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

  

  created() {
    this.widjetParams =  this.$widjet(window.widjetOuter)
  }
};
</script>
