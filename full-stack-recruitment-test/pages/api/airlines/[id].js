import connect from '../../../utils/connect'
import { Airline } from '../../../models'

connect()

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const airline = await Airline.findById(id)

        if (!airline) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: airline })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}