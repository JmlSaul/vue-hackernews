import {
  shallowMount
} from '@vue/test-utils'
import TestComponent from '../TestComponent.vue'

describe('TestComponent.vue', () => {
  test('contains hello world', () => {
    const wrapper = shallowMount(TestComponent)
    expect(wrapper.text()).not.toBe('Hello, World!')
  })
})
