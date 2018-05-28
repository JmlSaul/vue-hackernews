import Vue from 'vue'
import App from './App'
import {
  fetchListData
} from './api/api'

Vue.config.productionTip = false

function getTopItems () {
  return new Promise(resolve => {
    return resolve([{
      title: 'ttt',
      url: 'dsf'
    }, {
      title: '2342',
      url: 'cc'
    }])
  })
  // return fetchListData('top')
  //   .then(items => items)
}

getTopItems().then(res => {
  window.items = res
  console.log(res)
  new Vue({
    el: '#app',
    render: h => h(App)
  })
})
