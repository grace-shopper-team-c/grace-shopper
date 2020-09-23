import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllItems from './AllItems'
import configureMockStore from 'redux-mock-store'
import {Provider} from 'react-redux'

const mockStore = configureMockStore()

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllItem', () => {
  let allItem
  let store
  const items = [
    {
      name: 'OroHEY Hair',
      category: 'hair',
      price: '12.99',
      image: 'https://i.kym-cdn.com/photos/images/facebook/000/929/796/37f.png',
      id: 1
    }
  ]

  beforeEach(() => {
    store = mockStore()
    allItem = shallow(
      <Provider store={store}>
        <AllItems items={items} />
      </Provider>
    )
  })

  it('renders the Name', () => {
    expect(allItem.text()).to.include('OroHEY Hair')
  })
  it('renders the price', () => {
    expect(allItem.text()).to.include('12.99')
  })
})
