import Vue from 'vue'
import { timeAgo, host } from './src/util/filters'

Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)
Vue.config.productionTip = false
