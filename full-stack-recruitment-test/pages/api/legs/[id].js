import connect from '../../../utils/connect'
import { Leg } from '../../../models'

connect()

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req

  switch(method) {
    case 'GET':
      try {
        const leg = await Leg.findById(id)

        if (!leg) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: leg })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const leg = await Leg.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        
        if (!leg) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ succes: true, data: leg })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const deleted = await Leg.deleteOne({ _id: id })

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