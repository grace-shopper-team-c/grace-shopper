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

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    // it('PUT /api/users', async () => {
    //   const res = await request(app)
    //     .put('api/users', {email: 'newemail@puppybook.com'})
    //     .expect(204)
    //
    //   expect(res.body).to.be.an('array')
    //   expect(res.body[0].email).to.be.equal('newemail@puppybook.com')
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
