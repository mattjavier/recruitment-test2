import { model, Schema } from 'mongoose'

const Leg = new Schema({
  departureAirport: {
    type: String,
    required: [true, 'What airport is this flight departing from?']
  },
  arrivalAirport: {
    type: String,
    required: [true, 'What airport is this flight arriving to?']
  },
  departureTime: {
    type: String,
    required: [true, 'What time is this flight leaving?']
  },
  arrivalTime: {
    type: String,
    required: [true, 'What time does this flight arrive?']
  },
  stops: {
    type: Number,
    required: [true, 'How many stops does this flight have?']
  },
  airlineName: {
    type: String,
    required: [true, 'What is the name of the airline?']
  },
  airlineId: {
    type: String,
    required: [true, 'What is the airline ID?']
  },
  durationMins: {
    type: Number,
    required: [true, 'How long is this flight in minutes?']
  }
})

export default model('Leg', Leg)