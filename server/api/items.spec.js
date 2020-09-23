/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    const testName = 'OroHEY Hair'

    beforeEach(() => {
      return Item.create({
        name: 'OroHEY Hair',
        category: 'hair',
        price: '12.99',
        image:
          'https://i.kym-cdn.com/photos/images/facebook/000/929/796/37f.png',
        description: 'This soap will make you happy'
      })
    })

    it('GET /api/items all items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(testName)
    })

    it('GET /api/items/1 single item', async () => {
      const res = await request(app)
        .get('/api/items/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(testName)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
