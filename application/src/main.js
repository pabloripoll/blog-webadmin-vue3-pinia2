// App Dependencies

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from '@/App.vue'

import Axios from '@/plugin/axios'

import Router from '@/router'

// Create App

const pinia = createPinia()

const app = createApp(App)

// Apply

app.use(pinia)

app.use(Router)

app.config.globalProperties.axios = Axios

// Mount

app.mount('#app')
