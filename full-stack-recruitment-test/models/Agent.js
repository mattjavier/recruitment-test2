const { model, models, Schema } = require('mongoose')

const Agent = new Schema({
  name: {
    type: String,
    required: [true, 'Please input a name']
  },
  rating: {
    type: Number,
    required: [true, 'Please input a rating'],
    max: 10,
    min: 0
  }, 
})

module.exports = models.Agent || model('Agent', Agent)