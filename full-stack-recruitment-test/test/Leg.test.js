const mongoose = require('mongoose')
const { Leg } = require('../models')

const example = {
  departureAirport: 'LHR',
  arrivalAirport: 'BUD',
  departureTime: '11:25',
  arrivalTime: '19:10',
  stops: 1,
  airlineName: 'British Airways',
  airlineId: 'BA',
  durationMins: 190
}

describe('Leg Model Test', () => {
  
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

  it('create & save leg successfully', async () => {
    const validLeg = new Leg(example)
    const savedLeg = await validLeg.save()

    expect(savedLeg._id).toBeDefined()
    expect(savedLeg.departureAirport).toBe(example.departureAirport)
    expect(savedLeg.arrivalAirport).toBe(example.arrivalAirport)
    expect(savedLeg.departureTime).toBe(example.departureTime)
    expect(savedLeg.arrivalTime).toBe(example.arrivalTime)
    expect(savedLeg.stops).toBe(example.stops)
    expect(savedLeg.airlineName).toBe(example.airlineName)
    expect(savedLeg.airlineId).toBe(example.airlineId)
    expect(savedLeg.durationMins).toBe(example.durationMins)
  })

  // Testing that all fields required fields should be present
  it('create leg missing required field', async () => {
    const testValue = new Leg({
      arrivalAirport: 'BUD',
      departureTime: '11:25',
      arrivalTime: '19:10',
      stops: 1,
      airlineName: 'British Airways',
      airlineId: 'BA',
      durationMins: 190
    })

    let err
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.departureAirport).toBeDefined()
  })

  // Testing departureAirport.length
  it('create leg with departureAirport.length error', async () => {
    const testValue = new Leg({
      departureAirport: 'B',
      arrivalAirport: 'BUD',
      departureTime: '11:25',
      arrivalTime: '19:10',
      stops: 1,
      airlineName: 'British Airways',
      airlineId: 'BA',
      durationMins: 190
    })

    let err
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.departureAirport).toBeDefined()
  })
  
  // Testing time format
  it('create leg with incorrect arrivalTime formatting', async () => {
    const testValue = new Leg({
      departureAirport: 'LHR',
      arrivalAirport: 'BUD',
      departureTime: '11:25',
      arrivalTime: '19:1',
      stops: 1,
      airlineName: 'British Airways',
      airlineId: 'BA',
      durationMins: 190
    })

    let err
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.arrivalTime).toBeDefined()
  })
  
  
  // Testing stops min boundary
  it('create leg that breaks min stops boundary', async () => {
    const testValue = new Leg({
      departureAirport: 'LHR',
      arrivalAirport: 'BUD',
      departureTime: '11:25',
      arrivalTime: '19:10',
      stops: -1,
      airlineName: 'British Airways',
      airlineId: 'BA',
      durationMins: 190
    })

    let err
    try {
      const saveTest = await testValue.save()
      err = saveTest
    } catch (error) {
      err = error
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.stops).toBeDefined()
  })
  
  // Testing airlineId length
  it('create leg with incorrect airlineId format', async () => {
    const testValue = new Leg({
      departureAirport: 'LHR',
      arrivalAirport: 'BUD',
      departureTime: '11:25',
      arrivalTime: '19:10',
      stops: 1,
      airlineName: 'British Airways',
      airlineId: 'A',
      durationMins: 190
    })

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