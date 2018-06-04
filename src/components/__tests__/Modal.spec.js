import Modal from '../Modal.vue'
import {
  shallowMount
} from '@vue/test-utils'

describe('Modal.vue', () => {
  test('emits on-close when button is clicked', () => {
    const wrapper = shallowMount(Modal)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close-modal')).toHaveLength(1)
  })
})
