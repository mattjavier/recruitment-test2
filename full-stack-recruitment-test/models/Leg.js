const { model, Schema } = require('mongoose')

const Leg = new Schema({
  departureAirport: {
    type: String,
    required: [true, 'What airport is this flight departing from?'],
    maxlength: [3, 'Airport must be 3 characters in length']
  },
  arrivalAirport: {
    type: String,
    required: [true, 'What airport is this flight arriving to?'],
    maxlength: [3, 'Airport must be 3 characters in length']
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
    required: [true, 'What is the airline ID?'],
    maxlength: [2, 'ID must be 2 characters in length']
  },
  durationMins: {
    type: Number,
    required: [true, 'How long is this flight in minutes?']
  }
})

module.exports = model('Leg', Leg)