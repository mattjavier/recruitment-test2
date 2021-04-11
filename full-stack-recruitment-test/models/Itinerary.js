const { model, models, Schema } = require('mongoose')

const Itinerary = new Schema({
  legs: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Leg',
    }],
    validate: {
      validator: function(l) {
        return l.length === 2
      },
      message: 'An itinerary must have 2 legs'
    }
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
    required: [true, 'Please input a rating'],
    max: 10,
    min: 0
  },
})

module.exports = models.Itinerary || model('Itinerary', Itinerary)