const { model, Schema } = require('mongoose')

const Itinerary = new Schema({
  legs: [{
    type: Schema.Types.ObjectId,
    required: [true, 'Please select a flight'],
    ref: 'Leg'
  }],
  price: {
    type: Number,
    required: [true, 'Please input a price']
  },
  agent: {
    type: String,
    required: [true, 'Please input an agent']
  },
  agentRating: {
    type: Number,
    required: [true, 'Please input a rating']
  },
})

module.exports = model('Itinerary', Itinerary)