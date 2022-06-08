import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/reset.css'
import 'default-passive-events'
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

Vue.prototype.$addStorageEvent = function(type, key, data) {
  if (type === 1) {
    // 创建一个StorageEvent事件
    const newStorageEvent = document.createEvent('StorageEvent')
    const storage = {
      setItem: function(k, val) {
        localStorage.setItem(k, val)
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null)
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, data)
  } else {
    // 创建一个StorageEvent事件
    const newStorageEvent = document.createEvent('StorageEvent')
    const storage = {
      setItem: function(k, val) {
        sessionStorage.setItem(k, val)
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null)
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, data)
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

