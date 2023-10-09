import '../scss/app.scss';
import WidjetConnect from '../plugin/connector'
import formsHelper from '../plugin/formsHelper'
/* Your JS Code goes here */
import { createApp } from 'vue';
import App from '../App.vue';

const app = createApp(App);
app.use(WidjetConnect);
app.use(formsHelper);
app.mount('#v-consultant');




// if (window.myPluginSettings) {
//     Vue.prototype.$myPluginSettings = window.myPluginSettings;
//   } else {
//     Vue.prototype.$myPluginSettings = {}; // Если объект не определен, создаем пустой объект
//   }
// /* Demo JS */
// import './demo.js';
