import { createApp } from 'vue'

import App from './App.vue'

import { store, stateKey } from './store'

import PrimeVue from 'primevue/config'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import './assets/styles/main.scss'

const app = createApp(App)

app.use(PrimeVue)
app.use(store, stateKey)

app.mount('#app')
