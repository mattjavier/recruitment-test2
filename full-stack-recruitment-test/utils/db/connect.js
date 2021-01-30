import mongoose from 'mongoose'

const connect = async () => {
  return mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/flights_db', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateFindIndex: true,
    useUnifiedTopology: true,
  })
}

export default connect