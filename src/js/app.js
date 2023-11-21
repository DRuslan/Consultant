import '../scss/app.scss';
import WidjetConnect from '../plugin/connector'
import formsHelper from '../plugin/formsHelper'
import validate from '../plugin/validate'
import soundHelper from '../plugin/sound'
/* Your JS Code goes here */
import { createApp } from 'vue';
import App from '../App.vue';
import '../scss/app.scss'
const app = createApp(App);
// const fieldType = 'text'; // для инпутов в плагине где идет перебор все полей
app.use(WidjetConnect);
app.use(formsHelper);
// app.use(formsHelper, { fieldType });
app.use(validate);
app.use(soundHelper);
app.use(require('vue-cookies'))
app.mount('#v-consultant');




// if (window.myPluginSettings) {
//     Vue.prototype.$myPluginSettings = window.myPluginSettings;
//   } else {
//     Vue.prototype.$myPluginSettings = {}; // Если объект не определен, создаем пустой объект
//   }
// /* Demo JS */
// import './demo.js';
