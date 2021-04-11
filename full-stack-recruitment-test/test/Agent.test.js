const mongoose = require('mongoose')
const { Agent } = require('../models')

describe('Agent Model Test', () => {

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

  it('create & save agent successfully', async () => {
    const validAgent = new Agent({ name: 'CheapFlights', rating: 10.0 })
    const savedAgent = await validAgent.save()

    expect(savedAgent._id).toBeDefined()
    expect(savedAgent.name).toBe(validAgent.name)
    expect(savedAgent.rating).toBe(validAgent.rating)
  })

  // Testing that all required fields should be present
  it('create agent missing required field', async () => {
    const testValue = new Agent({ name: 'CheapFlights' })
    
    let err 
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.rating).toBeDefined()
  })

  // Testing min range for rating
  it('create agent violating min rating', async () => {
    const testValue = new Agent({ name: 'CheapFlights', rating: -1 })
    
    let err 
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.rating).toBeDefined()
  })
  
  // Testing max range for rating
  it('create agent violating max rating', async () => {
    const testValue = new Agent({ name: 'CheapFlights', rating: 12 })
    
    let err 
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.rating).toBeDefined()
  })
})