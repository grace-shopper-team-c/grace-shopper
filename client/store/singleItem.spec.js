/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchSingleItem} from './singleItem'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {item: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchSingleItem', () => {
    it('eventually dispatches the SET ITEM action', async () => {
      const fakeItem = {email: 'Cody'}
      mockAxios.onGet('/api/items/1').replyOnce(200, fakeItem)
      await store.dispatch(fetchSingleItem(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_ITEM')
      expect(actions[0].item).to.be.deep.equal(fakeItem)
    })
  })
})
