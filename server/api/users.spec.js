/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users/all', async () => {
      const res = await request(app)
        .get('/api/users/all')
        .expect(403)

      expect(res.error.text).to.be.equal('User is not an admin!!!')
    })

    it('GET /api/users/:userId/orders', async () => {
      const res = await request(app)
        .get('/api/users/1/orders')
        .expect(401)

      expect(res.error.text).to.be.equal('Wrong Account')
    })

    it('PUT /api/users/:userId', async () => {
      const res = await request(app)
        .put('/api/users/1')
        .send({state: 'IL'})
        .expect(401)

      expect(res.error.text).to.be.equal('Wrong Account')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
