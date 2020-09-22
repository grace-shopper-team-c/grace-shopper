import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleItem from './SingleItem'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleItem', () => {
  let singleItem
  const item = {
    id: 1,
    name: 'HappySoap',
    price: 9.99,
    description: 'This soap will make you happy',
    image: ''
  }

  beforeEach(() => {
    singleItem = shallow(<SingleItem item={item} />)
  })

  it('renders the Name in an h2', () => {
    expect(singleItem.find('h3').text()).to.be.equal('Happy Soap')
  })
  it('renders the price in an h3', () => {
    expect(singleItem.find('h3').text()).to.be.equal('9.99')
  })
  it('renders the description in an p', () => {
    expect(singleItem.find('h3').text()).to.be.equal(
      'This soap will make you happy'
    )
  })
})
