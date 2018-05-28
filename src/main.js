import Vue from 'vue'
import App from './App'
import ProgressBar from './components/ProgressBar'
import axios from 'axios'

Vue.config.productionTip = false

const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)

Vue.prototype.axios = axios

new Vue({
  el: '#app',
  render: h => h(App)
})
