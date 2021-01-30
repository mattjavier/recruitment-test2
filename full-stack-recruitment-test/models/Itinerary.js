import { model, Schema } from 'mongoose'

const Itinerary = new Schema({
  legs: {
    type: Array,
    unique: false,
    required: [true, 'What are the flights of this itinerary?']
  },
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