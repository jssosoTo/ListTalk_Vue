import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Mask from './Mask.vue'
import AlertMask from './AlertMask.vue'
import router from './router'

const app = createApp(App)
const mask = createApp(Mask)
const alertMask = createApp(AlertMask)

app.use(createPinia())
app.use(router)

mask.use(createPinia())
alertMask.use(createPinia())

mask.mount('#mask')
app.mount('#app')
alertMask.mount('#alert')
