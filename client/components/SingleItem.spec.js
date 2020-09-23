import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleItem from './SingleItem'
import configureMockStore from 'redux-mock-store'
import {Provider} from 'react-redux'

const mockStore = configureMockStore()

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleItem', () => {
  let store
  let singleItem
  const item = {
    name: 'OroHEY Hair',
    category: 'hair',
    price: '12.99',
    image: 'https://i.kym-cdn.com/photos/images/facebook/000/929/796/37f.png',
    description: 'This soap will make you happy',
    id: 1
  }

  beforeEach(() => {
    store = mockStore(item)
    singleItem = shallow(
      <Provider store={store}>
        <SingleItem />
      </Provider>
    )
  })

  it('renders the Name in an h2', () => {
    expect(singleItem.text()).to.include('OroHEY Hair')
  })
  it('renders the price in an h3', () => {
    expect(singleItem.text()).to.include('12.99')
  })
  it('renders the description in an p', () => {
    expect(singleItem.text()).to.include('This soap will make you happy')
  })
})
