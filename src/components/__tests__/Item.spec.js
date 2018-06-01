import { shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'
// import { host, timeAgo } from '../../util/filters'

// let localVue = createLocalVue()
// localVue.filter('host', host)
// localVue.filter('timeAgo', timeAgo)

describe('Item.vue', () => {
  test('renders item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.score)
  })

  test('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  test('renders an <a> element containing item.title', () => {
    const item = {
      title: 'some title'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.find('a').text()).toBe(item.title)
  })

  test('renders an a tag with href item.url', () => {
    const item = {
      url: 'http://some-url.com'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    const aWrapper = wrapper.find('a')
    expect(aWrapper.attributes().href).toBe(item.url)
  })

  test('renders the time since the last post', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')
    dateNow.mockImplementation(() => dateNowTime)
    const item = {
      time: (dateNowTime / 1000) - 600
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    dateNow.mockRestore()
    expect(wrapper.text()).toContain('10 minutes ago')
  })

  test('renders the host name', () => {
    const item = {
      url: 'https://some-url.com/with-paths'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain('(some-url.com)')
  })

  test('renders correctly', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')
    dateNow.mockImplementation(() => dateNowTime)
    const item = {
      by: 'eddyerburgh',
      id: 11122233,
      score: 10,
      time: (dateNowTime / 1000) - 600,
      title: 'vue-test-utils is released',
      type: 'story',
      url: 'https://vue-test-utils.vuejs.org/'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    dateNow.mockRestore()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders correctly when item has no url', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')
    dateNow.mockImplementation(() => dateNowTime)
    const item = {
      by: 'eddyerburgh',
      id: 11122233,
      score: 10,
      time: (dateNowTime / 1000) - 600,
      title: 'vue-test-utils is released'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    dateNow.mockRestore()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
