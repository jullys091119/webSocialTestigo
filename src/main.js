import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css';//No olvides importar esto para los iconos

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

import App from './App.vue';
import './registerServiceWorker';
import router from './router';

createApp(App)
  .use(vuetify)  // Usar Vuetify primero
  .use(router)   // Luego usar el router
  .mount('#app');
