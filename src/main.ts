import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import Mask from './Mask.vue';
import router from './router'

const app = createApp(App)
const mask = createApp(Mask);

app.use(createPinia())
app.use(router)

mask.use(createPinia());

mask.mount('#mask')
app.mount('#app')
