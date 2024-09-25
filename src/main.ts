import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LocalStorage, Notify, Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {
    LocalStorage,
    Notify
  },
  config: {
    notify: {
      position: 'bottom-right',
      progress: true,
      timeout: 5000
    }
  }
})

app.mount('#app')
