import Vuex from 'vuex'
import deepClone from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import storeConfig from '../store-config'
import {
  fetchListData
} from '../../api/api'
import {
  createLocalVue
} from '@vue/test-utils'
import Router from 'vue-router'
import {
  sync
} from 'vuex-router-sync'
import routerConfig from '../../router/router-config'

jest.mock('../../api/api')

let localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
const clonedStoreConfig = deepClone(storeConfig)
const store = new Vuex.Store(clonedStoreConfig)
const router = new Router(routerConfig)
sync(store, router)

function createItems () {
  const arr = new Array(22)
  return arr.fill().map((item, i) => ({
    id: `a${i}`,
    name: 'item'
  }))
}

describe('store-config', () => {
  test('calling fetchListData with the type returns top 20 activeItems from activeItems getter', async () => {
    const items = createItems()
    const type = 'top'
    fetchListData.mockImplementation((calledType) => {
      return calledType === type ? Promise.resolve(items) : Promise.resolve()
    })
    store.dispatch('fetchListData', {
      type
    })
    await flushPromises()
    expect(store.getters.displayItems).toHaveLength(20)
    expect(store.getters.displayItems.every((item, i) => item ===
      items[i])).toBe(true)
  })
})
