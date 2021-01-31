const mongoose = require('mongoose')
const { Itinerary } = require('../models')

describe('Itinerary Model Test', () => {
  
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

  it('create & save itinerary successfully', async () => {
    const validItinerary = new Itinerary({
      legs: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
      price: 35,
      agent: 'Wizzair.com',
      agentRating: 9.1
    })
    const savedItinerary = await validItinerary.save()

    expect(savedItinerary._id).toBeDefined()
    expect(savedItinerary.legs).toBe(validItinerary.legs)
    expect(savedItinerary.price).toBe(validItinerary.price)
    expect(savedItinerary.agent).toBe(validItinerary.agent)
    expect(savedItinerary.agentRating).toBe(validItinerary.agentRating)
  })

  // Testing that all required fields should be present
  it('create itinerary missing required field', async () => {
    const testValue = new Itinerary({
      legs: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
      agent: 'Wizzair.com',
      agentRating: 9.1
    })

    let err 
    try { 
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    } 

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.price).toBeDefined()
  })

  // Testing valid legs.length
  it('create itinerary with incorrect leg field length', async () => {
    const testValue = new Itinerary({
      legs: [mongoose.Types.ObjectId()],
      price: 35,
      agent: 'Wizzair.com',
      agentRating: 9.1
    })
    
    let err 
    try { 
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    } 
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.legs).toBeDefined()
  })

  // Testing legs type
  it('create itinerary with wrong leg item type', async () => {
    const testValue = new Itinerary({
      legs: ['hello', 'world'],
      price: 35,
      agent: 'Wizzair.com',
      agentRating: 9.1
    })

    let err 
    try { 
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    } 
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.legs).toBeDefined()
  })
  
  // Testing agentRating min
  it('create itinerary with invalid agentRating (min)', async () => {
    const testValue = new Itinerary({
      legs: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
      price: 35,
      agent: 'Wizzair.com',
      agentRating: -1
    })

    let err 
    try { 
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    } 
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.agentRating).toBeDefined()
  })

  it('create itinerary with invalid agentRating (max)', async () => {
    const testValue = new Itinerary({
      legs: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
      price: 35,
      agent: 'Wizzair.com',
      agentRating: 50
    })

    let err 
    try { 
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    } 
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.agentRating).toBeDefined()
  })
})