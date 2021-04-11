import connect from '../../../utils/connect'
import { Airline } from '../../../models'

connect() 

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const airlines = await Airline.find({})

        res.status(200).json({ success: true, data: airlines })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST': 
      try {
        const airline = await Airline.create(req.body)
        
        res.status(201).json({ success: true, data: airline })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}