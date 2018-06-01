import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ProgressBar from './components/ProgressBar'
import axios from 'axios'
import storeConfig from './store/store-config'
import Router from 'vue-router'
import routerConfig from './router/router-config'
import { sync } from 'vuex-router-sync'
import { titleMixin } from './util/mixins'
import { timeAgo, host } from './util/filters'

Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)
Vue.use(Router)
const router = new Router(routerConfig)
sync(store, router)
Vue.mixin(titleMixin)
Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)

Vue.config.productionTip = false
Vue.prototype.axios = axios

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  router,
  render: h => h(App)
})
