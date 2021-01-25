'use strict'

const db = require('../server/db')
const {AllStats, IndivStat} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const allStats = await Promise.all([
    AllStats.create({
      HP: 100,
      Energy: 9,
      Wisdom: 60,
      Speed: 45,
      Strength: 20,
      RatioHP: 100,
      RatioEnergy: 7,
      RatioWisdom: 60,
      RatioSpeed: 30,
      RatioStrength: 20,
      Date: 'Mon Jan 18 2021'
    }),
    AllStats.create({
      HP: 130,
      Energy: 8,
      Wisdom: 15,
      Speed: 30,
      Strength: 30,
      RatioHP: 100,
      RatioEnergy: 7,
      RatioWisdom: 15,
      RatioSpeed: 30,
      RatioStrength: 30,
      Date: 'Tue Jan 19 2021'
    }),
    AllStats.create({
      HP: 40,
      Energy: 8,
      Wisdom: 45,
      Speed: 20,
      Strength: 35,
      RatioHP: 40,
      RatioEnergy: 7,
      RatioWisdom: 45,
      RatioSpeed: 20,
      RatioStrength: 35,
      Date: 'Wed Jan 20 2021'
    }),
    AllStats.create({
      HP: 70,
      Energy: 5,
      Wisdom: 60,
      Speed: 20,
      Strength: 25,
      RatioHP: 70,
      RatioEnergy: 5,
      RatioWisdom: 60,
      RatioSpeed: 20,
      RatioStrength: 25,
      Date: 'Thu Jan 21 2021'
    }),
    AllStats.create({
      HP: 110,
      Energy: 8,
      Wisdom: 15,
      Speed: 34,
      Strength: 25,
      RatioHP: 100,
      RatioEnergy: 7,
      RatioWisdom: 15,
      RatioSpeed: 30,
      RatioStrength: 25,
      Date: 'Fri Jan 22 2021'
    }),
    AllStats.create({
      HP: 50,
      Energy: 6,
      Wisdom: 24,
      Speed: 20,
      Strength: 10,
      RatioHP: 50,
      RatioEnergy: 6,
      RatioWisdom: 24,
      RatioSpeed: 20,
      RatioStrength: 10,
      Date: 'Sat Jan 23 2021'
    }),
    AllStats.create({
      HP: 0,
      Energy: 0,
      Wisdom: 0,
      Speed: 0,
      Strength: 0,
      RatioHP: 0,
      RatioEnergy: 0,
      RatioWisdom: 0,
      RatioSpeed: 0,
      RatioStrength: 0,
      Date: 'Sun Jan 24 2021'
    })
  ])
  const indivStat = await Promise.all([
    IndivStat.create({
      Name: 'HP',
      Description: 'HP Description'
    }),
    IndivStat.create({
      Name: 'Energy',
      Description: 'Energy Description'
    }),
    IndivStat.create({
      Name: 'Wisdom',
      Description: 'Wisdom Description'
    }),
    IndivStat.create({
      Name: 'Speed',
      Description: 'Speed Description'
    }),
    IndivStat.create({
      Name: 'Strength',
      Description: 'Strength Description'
    })
  ])

  console.log(`seeded ${allStats.length} allStats`)
  console.log(`seeded ${indivStat.length} indivStat`)
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
