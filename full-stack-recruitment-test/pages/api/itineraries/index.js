import connect from '../../../utils/connect'
import { Itinerary } from '../../../models'

connect()

export default async (req, res) => {
  const { method } = req
  
  switch (method) {
    case 'GET':
      try {
        const itineraries = await Itinerary.find({})

        res.status(200).json({ success: true, data: itineraries })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const itinerary = await Itinerary.create(req.body)
        
        res.status(201).json({ success: true, data: itinerary })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default: 
      res.status(400).json({ success: false })
      break
  }
}