import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ProgressBar from './components/ProgressBar'
import axios from 'axios'
import storeConfig from './store/store-config'

Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)
Vue.config.productionTip = false
Vue.prototype.axios = axios

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  render: h => h(App)
})
