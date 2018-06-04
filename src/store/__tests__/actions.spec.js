import actions from '../actions'
import {
  fetchListData
} from '../../api/api'
import flushPromises from 'flush-promises'

jest.mock('../../api/api')

describe('actions', () => {
  test('fetchListData calls commit with setItems and the result of fetchListData', async () => {
    const items = [{}, {}]
    const type = 'top'
    fetchListData.mockImplementation(calledWith => {
      return calledWith === type ? Promise.resolve(items) : Promise.resolve()
    })
    const context = {
      commit: jest.fn()
    }
    actions.fetchListData(context, {
      type
    })
    await flushPromises()
    expect(context.commit).toHaveBeenCalledWith('setItems', {
      items
    })
  })
})
