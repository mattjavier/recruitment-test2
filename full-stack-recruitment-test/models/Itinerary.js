const { model, models, Schema } = require('mongoose')

const Itinerary = new Schema({
  legs: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Leg',
    }],
    maxlength: [2, 'Itinerary must have 2 legs'],
    minlength: [2, 'Itinerary must have 2 legs']
  },
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

module.exports = models.Itinerary || model('Itinerary', Itinerary)