import Modal from '../Modal.vue'
import {
  shallow
} from '@vue/test-utils'

describe('Modal.vue', () => {
  test('emits on-close when button is clicked', () => {
    const wrapper = shallow(Modal)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close-modal')).toHaveLength(1)
  })
})
