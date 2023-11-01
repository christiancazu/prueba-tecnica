import { createApp } from 'vue'

import App from './App.vue'

import { store, stateKey } from './store'
import router from './router'

import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-dark-teal/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import './assets/styles/main.scss'

createApp(App)
  .use(router)
  .use(store, stateKey)
  .use(PrimeVue, { ripple: true })
  .directive('tooltip', Tooltip)
  .mount('#app')
