
import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

const localVue = createLocalVue() // #A
localVue.use(Vuex) // #B

describe('ItemList.vue', () => {
  let storeOptions // #A
  let store

  beforeEach(() => {
    storeOptions = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }

    store = new Vuex.Store(storeOptions) // #D
  })

  test('renders an Item for each item in displayItems getter', async () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{}, {}, {}]
    storeOptions.getters.displayItems.mockReturnValue(items) // #E
    const wrapper = shallow(ItemList, {mocks: {$bar}, localVue, store}) // #F
    await flushPromises()
    expect(wrapper.findAll(Item).length).toBe(items.length)
  })

  test('passes an item object to each Item component', () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{}, {}, {}]
    storeOptions.getters.displayItems.mockReturnValue(items)
    const wrapper = shallow(ItemList, {mocks: {$bar}, localVue, store})
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    shallow(ItemList, {mocks: {$bar}, localVue, store})
    expect($bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load successful', async () => {
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    shallow(ItemList, {mocks: {$bar}, localVue, store})
    await flushPromises()
    expect($bar.finish).toHaveBeenCalled()
  })

  test('dispatches fetchListData with top', async () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    store.dispatch = jest.fn(() => Promise.resolve()) // #A
    shallow(ItemList, {mocks: {$bar}, localVue, store})
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {type: 'top'}) // #B
  })

  test('calls $bar fail when fetchListData throws', async () => {
    const $bar = {
      start: jest.fn(),
      fail: jest.fn()
    }
    storeOptions.actions.fetchListData.mockRejectedValue() // #A
    shallow(ItemList, {mocks: {$bar}, localVue, store}) // #B
    await flushPromises() // #C
    expect($bar.fail).toHaveBeenCalled() // #D
  })
})

// test('calls $bar start on load', () => {
//   const $bar = {
//     start: jest.fn(),
//     finish: () => {}
//   }
//   mount(ItemList, {mocks: {$bar}, localVue, store})
//   expect($bar.start).toHaveBeenCalled()
// })

// test('calls $bar finish when load successful', async () => {
//   const $bar = {
//     start: () => {},
//     finish: jest.fn()
//   }
//   mount(ItemList, {mocks: {$bar}, localVue, store})
//   await flushPromises()
//   expect($bar.finish).toHaveBeenCalled()
// })

// test('dispatches fetchListData with top', async () => {
//   const $bar = {
//     start: () => {},
//     finish: () => {}
//   }
//   store.dispatch = jest.fn(() => Promise.resolve()) // #I
//   mount(ItemList, {mocks: {$bar}, localVue, store})
//   expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {type: 'top'}) // #J
// })

// test('calls $bar fail when fetchListData throws', async () => {
//   const $bar = {
//     start: jest.fn(),
//     fail: jest.fn()
//   }
//   storeOptions.actions.fetchListData.mockRejectedValue() // #A
//   mount(ItemList, {mocks: {$bar}, localVue, store}) // #B
//   await flushPromises() // #C
//   expect($bar.fail).toHaveBeenCalled() // #D
// })
// // })
