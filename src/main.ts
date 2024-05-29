import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import VueDayjs from 'vue3-dayjs-plugin'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(VueDayjs)
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-center'
  } as ToastContainerOptions)
  .mount('#app')
