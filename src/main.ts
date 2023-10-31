import { createApp } from 'vue'

import App from './App.vue'

import { store, stateKey } from './store'
import router from './router'

import PrimeVue from 'primevue/config'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import './assets/styles/main.scss'

createApp(App)
  .use(router)
  .use(store, stateKey)
  .use(PrimeVue, { ripple: true })
  .mount('#app')
