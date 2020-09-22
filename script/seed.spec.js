'use strict'
/* global describe it */

const seed = require('./seed')
const {Item, User} = require('../server/db')

describe('seed script', () => {
  it('completes successfully', seed)
  it('populates the database with at least four items', async () => {
    const seedItems = await Item.findAll()
    expect(seedItems).to.have.lengthOf.at.least(4)
  })
  it('populates the database with at least two users', async () => {
    const seedUsers = await User.findAll()
    expect(seedUsers).to.have.lengthOf.at.least(2)
  })
})
