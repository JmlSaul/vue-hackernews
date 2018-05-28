import {
  shallowMount
} from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

describe('ItemList.vue', () => {
  test('renders an Item for each item in window.items', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallowMount(ItemList)
    expect(wrapper.findAll(Item).length).toEqual(window.items.length)
  })

  test('passes an item object to each Item component', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallowMount(ItemList)
    const ItemsArray = wrapper.findAll(Item)
    ItemsArray.wrappers.forEach((w, i) => {
      // expect(w.vm.item).toBe(window.items[i])
      expect(w.props().item).toBe(window.items[i])
    })
  })
})
