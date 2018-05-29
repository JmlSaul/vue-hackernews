import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import merge from 'lodash.merge'

jest.mock('../../api/api.js')

describe('ItemList.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  function createStore (overrides) {
    const defaultStoreConfig = {
      state: {
        items: []
      },
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    return new Vuex.Store(merge(defaultStoreConfig, overrides))
  }

  function createWrapper (overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn()
        }
      },
      localVue,
      store: createStore()
    }
    return shallowMount(ItemList, merge(defaultMountingOptions, overrides))
  }

  test('renders an Item for each item in displayItems getter', async () => {
    const items = [{}, {}, {}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({
      store
    })
    await flushPromises()
    expect(wrapper.findAll(Item).length).toBe(items.length)
  })

  test('passes an item object to each Item component', async () => {
    const items = [{}, {}, {}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({
      store
    })
    await flushPromises()
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on render', () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    }
    createWrapper({
      mocks
    })
    expect(mocks.$bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load successful', async () => {
    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    }
    createWrapper({
      mocks
    })
    await flushPromises()
    expect(mocks.$bar.finish).toHaveBeenCalled()
  })

  test('dispatches fetchListData with top', async () => {
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())
    createWrapper({
      store
    })
    await flushPromises()
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top'
    })
  })

  test('calls $bar fail when fetchListData throws', async () => {
    const store = createStore({
      actions: {
        fetchListData: jest.fn(() => Promise.reject())
      }
    })
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }
    createWrapper({
      mocks,
      store
    })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })
})
