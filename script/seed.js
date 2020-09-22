'use strict'

const db = require('../server/db')
const {Item, User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const items = await Promise.all([
    Item.create({
      name: 'Face Wash',
      category: 'skin care',
      quantity: 0,
      price: 30.99,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR156OdyJqgpqr1MSJAZjEsDwQy6ipjz2LnCTUtpe9l4FLurMeiYCrWbJUIfc-BJXeITDCV9cc&usqp=CAc',
      description:
        'The face wash thats perfect for those splashing water on your face moments'
    }),
    Item.create({
      name: 'Thor Hair',
      category: 'hair care',
      quantity: 0,
      price: 36.99,
      image:
        'https://external-preview.redd.it/fiuiCSjD_hrtGv92DLk1z2qRpweIWwazJehh4cYd68U.jpg?auto=webp&s=60f122a6fd4e75984d62cdfbc8011bcbfc086f30',
      description: 'For those luscious locks!'
    }),
    Item.create({
      name: 'Everyday Cleaning Gloves',
      category: 'cleaning supplies',
      quantity: 3,
      price: 9.99,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/71ioBYTvABL._AC_SL1500_.jpg',
      description:
        'Just your average, wear everyday, style of glove. Perfect for cleaning the stains off those tough dishes or for taking out the trash!'
    }),
    Item.create({
      name: 'Calming Nature',
      category: 'candles',
      quantity: 5,
      price: 24.99,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/71K530MlZwL._AC_SL1500_.jpg',
      description:
        'The perfect scent to smell the outdoors while indoors as well as help you relieve your stress'
    })
  ])

  const users = await Promise.all([
    User.create({
      // name: 'Brosef Stalin',
      email: 'brosef.stalin@email.com',
      password: 'bahamamama'
      // address: '1234 Bro Lane, Fern, Colorado, 13456'
    }),
    User.create({
      // name: 'Seymour Cheeks',
      email: 'bartFan4ever@email.com',
      password: 'squiggle'
      // address: '742 Evergreen Terrace, Springfield, Oregan, 43522'
    })
  ])

  console.log(`seeded ${users.length} users & ${items.length} items`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
