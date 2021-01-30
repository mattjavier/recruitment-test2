import { model, Schema } from 'mongoose'

const Itinerary = new Schema({
  legs: [{
    type: Schema.Types.ObjectId,
    ref: 'Leg'
  }],
  price: {
    type: Number,
    required: [true, 'What is the price of this travel itinerary?']
  },
  agent: {
    type: String,
    required: [true, 'What is the name of the agent?']
  },
  agentRating: {
    type: Number,
    required: [true, 'What is the rating of this agent?']
  },
})

export default model('Itinerary', Itinerary)