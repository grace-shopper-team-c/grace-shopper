import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cart from './Cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart', () => {
  let testCart
  let items = [
    {
      name: 'OroHEY Hair',
      category: 'hair',
      price: '12.99',
      image: 'https://i.kym-cdn.com/photos/images/facebook/000/929/796/37f.png'
    }
  ]
  // beforeEach(() => {
  //   testCart = shallow(<Cart cart={items} />)
  // })
  it('renders information about the item added to cart', () => {
    //const images = wrapper.find("img").map((node) => node.get(0).props.src);
    //expect(images).to.include.('https://i.kym-cdn.com/photos/images/facebook/000/929/796/37f.png');
  })
})
