import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/reset.css'
import CustomVant from '@/components/Vant'
import baseHeader from '@/components/Common/BaseHeader'
Vue.prototype.$imgUrl = process.env.VUE_APP_IMG_URL
Vue.component('baseHeader', baseHeader)
Vue.use(CustomVant)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  Vue.prototype.$fromUrl = from
  next()
})

window.addEventListener('popstate', function(e) {
  router.isBack = true
}, false)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

