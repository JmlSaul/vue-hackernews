import Form from '../Form.vue'
import {
  shallow
} from '@vue/test-utils'

describe('Form.vue', () => {
  test('emits form-submitted when form is submmited', () => {
    const axios = {
      post: jest.fn()
    }
    const wrapper = shallow(Form, {
      mocks: {
        axios
      }
    })
    wrapper.find('button').trigger('submit')
    expect(wrapper.emitted('form-submitted')).toHaveLength(1)
  })

  test('sends post request with email on submit', () => {
    const axios = {
      post: jest.fn()
    }
    const wrapper = shallow(Form, {
      mocks: {
        axios
      }
    })
    const input = wrapper.find('input[type="email"]')
    input.element.value = 'email@gmail.com'
    input.trigger('input')
    wrapper.find('button').trigger('submit')
    const url = 'http://demo7437963.mockable.io/validate'
    expect(axios.post.mock.calls[0][0]).toBe(url)
    expect(axios.post.mock.calls[0][1].email).toBe('email@gmail.com')
  })

  test('sends post request with the shouldContact tickbox on submit', () => {
    const axios = {
      post: jest.fn()
    }
    const wrapper = shallow(Form, {
      mocks: {
        axios
      }
    })
    const url = 'http://demo7437963.mockable.io/validate'
    wrapper.find('button').trigger('submit')
    expect(axios.post.mock.calls[0][0]).toBe(url)
    expect(axios.post.mock.calls[0][1].enterCompetition).toBe(true)
    const noRadiobox = wrapper.find('input[value="no"]')
    noRadiobox.checked = true
    noRadiobox.trigger('change')
    wrapper.find('button').trigger('submit')

    expect(axios.post.mock.calls[1][0]).toBe(url)
    expect(axios.post.mock.calls[1][1].enterCompetition).toBe(false)
  })

//   test('select', () => {
//     wrapper = shallow(SelectForm)
//     wrapper.findAll('option').at(1).element.selected = true
//     wrapper.find('select').trigger('change')
//   })
})
