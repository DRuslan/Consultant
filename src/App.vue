<template>
  <div>
    <h1>Hello, Vue 3 with Webpack 5!</h1>
    <p>API Key: {{ $myPluginSettings.apiKey }}</p>
    <p>API Key: {{ widjetParamsOuter.apiKey }}</p>
    <panel />
  </div>
</template>

<script>
import panel from './components/Panel.vue';
export default {
  name: 'App',
  components: {panel},
  data() {
    widjetParamsOuter = {}
  },
  setup () {
    const pluginParams = window.myPluginSettings;
    this.widjetParamsOuter = pluginParams;
  }
};
</script>

<style>
/* Ваши стили здесь */
</style>