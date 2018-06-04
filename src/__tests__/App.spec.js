import App from '../App.vue'
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Modal from '../components/Modal.vue'
import Router from 'vue-router'

describe('App.vue', () => {
  test('hides Modal when Modal emits close-modal', () => {
    const localVue = createLocalVue()
    localVue.use(Router)
    const router = new Router()
    const wrapper = shallowMount(App, {
      router,
      localVue
    })
    wrapper.find(Modal).vm.$emit('close-modal')
    expect(wrapper.find(Modal).exists()).toBeFalsy()
  })
})
