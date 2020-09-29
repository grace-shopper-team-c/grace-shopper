/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {deleteItem, fetchAllItems} from './items'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {items: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllItems', () => {
    it('eventually dispatches the GET All Items action', async () => {
      const fakeItem = {email: 'Cody'}
      mockAxios.onGet('/api/items').replyOnce(200, fakeItem)
      await store.dispatch(fetchAllItems())
      const actions = store.getActions()
      expect(actions[1].type).to.be.equal('GET_ALL_ITEMS')
      expect(actions[1].items).to.be.deep.equal(fakeItem)
    })
  })
})
