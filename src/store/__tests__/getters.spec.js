import getters from '../getters'

describe('getters', () => {
  test('displayItems returns the first 20 items from state.list', () => {
    var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const state = {
      items: [...numberArray]
    }
    const result = getters.displayItems(state)
    expect(result.length).toEqual(20)
    result.forEach((item, i) => {
      expect(item).toEqual(numberArray[i])
    })
  })

  test('remainingTodos returns the remaining todos', () => {
    const getters = {
      todos: ['fix car', 'cook chilli', 'buy milk'],
      completedTodos: ['fix car', 'cook chilli'],
      remainingTodos () {
        return this.todos.length - this.completedTodos.length
      }
    }
    const result = getters.remainingTodos({}, getters)
    expect(result).toBe(1)
  })
})
