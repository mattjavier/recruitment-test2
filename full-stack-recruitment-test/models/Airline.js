const { model, models, Schema } = require('mongoose')

const Airline = new Schema({
  name: {
    type: String,
    required: true
  },
  airlineId: {
    type: String,
    required: true,
    uppercase: true
  },
})

module.exports = models.Airline || model('Airline', Airline)