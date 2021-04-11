const { model, models, Schema } = require('mongoose')

const Leg = new Schema({
  departureAirport: {
    type: String,
    required: [true, 'What airport is this flight departing from?'],
    uppercase: true,
    minlength: [3, 'Airport must be 3 characters in length'],
    maxlength: [3, 'Airport must be 3 characters in length'],
    match: [/[A-Z]+/, 'Please input a valid ID']
  },
  arrivalAirport: {
    type: String,
    required: [true, 'What airport is this flight arriving to?'],
    uppercase: true,
    minlength: [3, 'Airport must be 3 characters in length'],
    maxlength: [3, 'Airport must be 3 characters in length'],
    match: [/[A-Z]+/, 'Please input a valid ID']
  },
  departureTime: {
    type: String,
    required: [true, 'What time is this flight leaving?'],
    match: [/([01]?[0-9]|2[0-3]):[0-5][0-9]/, 'Please input a valid time']
  },
  arrivalTime: {
    type: String,
    required: [true, 'What time does this flight arrive?'],
    match: [/([01]?[0-9]|2[0-3]):[0-5][0-9]/, 'Please input a valid time']
  },
  stops: {
    type: Number,
    required: [true, 'How many stops does this flight have?'],
    min: [0, 'A flight can have no less than 0 stops']
  },
  airlineName: {
    type: String,
    required: [true, 'What is the name of the airline?']
  },
  airlineId: {
    type: String,
    required: [true, 'What is the airline ID?'],
    uppercase: true,
    minlength: [2, 'ID must be 2 characters in length'],
    maxlength: [2, 'ID must be 2 characters in length'],
    match: [/[A-Z]+/, 'Please input a valid ID']
  },
  durationMins: {
    type: Number,
    required: [true, 'How long is this flight in minutes?']
  }
})

module.exports = models.Leg || model('Leg', Leg)