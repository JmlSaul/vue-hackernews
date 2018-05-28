import {
  shallowMount
} from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
  })
  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%')
  })
  test('sets width using vm.percent', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.setData({
      percent: 70
    })
    expect(wrapper.element.style.width).toBe('70%')
  })
})
