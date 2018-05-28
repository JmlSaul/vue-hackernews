import Child from '../Child.vue'
import TestComponent from '../TestComponent.vue'
import {
  shallowMount
} from '@vue/test-utils'

describe('Child.vue', () => {
  test('child test prop', () => {
    const wrapper = shallowMount(TestComponent)
    debugger
    expect(wrapper.find(Child).props().testProp).toBe('some-value')
  })
})
