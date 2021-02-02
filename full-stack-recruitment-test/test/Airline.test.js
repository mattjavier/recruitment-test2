const mongoose = require('mongoose')
const { Airline } = require('../models')

describe('Airline Model Test', () => {

  let db 

  beforeAll(async () => {
    db = await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }, err => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })

  afterAll(async () => {
    await db.close()
  })

  it('create & save airline successfully', async () => {
    const validAirline = new Airline({ name: 'British Airways', airlineId: 'BA' })
    const savedAirline = await validAirline.save()

    expect(savedAirline._id).toBeDefined()
    expect(savedAirline.name).toBe(validAirline.name)
    expect(savedAirline.airlineId).toBe(validAirline.airlineId)
  })

  // Testing that all required fields should be present
  it('create airline missing required field', async () => {
    const testValue = new Airline({ name: 'British Airways' })
    
    let err 
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.airlineId).toBeDefined()
  })
})