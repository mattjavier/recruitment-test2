import connect from '../../../utils/connect'
import { Itinerary } from '../../../models'

connect()

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const itinerary = await Itinerary.findById(id)

        if (!itinerary) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: itinerary })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const itinerary = await Itinerary.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        
        if (!itinerary) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ succes: true, data: itinerary })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const deleted = await Itinerary.deleteOne({ _id: id })

        if (!deleted) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}