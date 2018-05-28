import {
  shallowMount
} from '@vue/test-utils'
import Item from '../Item.vue'
describe('Item.vue', () => {
  test('renders item', () => {
    const wrapper = shallowMount(Item, {
      propsData: {
        item: {
          by: 'item'
        }
      }
    })
    expect(wrapper.text()).toContain('item')
  })

  test('renders item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.score)
  })
  test('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.by)
  })
  test('renders item.url', () => {
    const item = {
      url: 'http://some-url.com'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.url)
  })
  test('renders an a tag', () => {
    const item = {}
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.find('a').exists()).toBe(true)
  })
  test('renders an <a> element containing item.title', () => {
    const item = {
      title: 'some title'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.find('a').text()).toBe(item.title)
  })
  test('renders an a tag with href item.url', () => {
    const item = {
      url: 'http://some-url.com'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    const aWrapper = wrapper.find('a')
    expect(aWrapper.attributes().href).toBe(item.url)
  })
})

// test('sanity test', () => {
//   expect(true).toBe(true)
// })
