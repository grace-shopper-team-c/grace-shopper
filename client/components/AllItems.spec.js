import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllItems from './AllItems'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllItem', () => {
  let allItem

  const items = [
    {
      id: 1,
      name: 'HappySoap',
      price: 9.99
    }
  ]

  beforeEach(() => {
    allItem = shallow(<AllItems items={items} />)
  })

  it('renders the Name in an h3', () => {
    expect(allItem.find('h3').text()).to.be.equal('Happy Soap')
  })
  it('renders the price in an h3', () => {
    expect(allItem.find('h3').text()).to.be.equal('9.99')
  })
})
