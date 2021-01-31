import connect from '../../../utils/connect'
import  { Leg } from '../../../models'

connect()

export default async (req, res) => {
  const { method } = req
  
  switch (method) {
    case 'GET':
      try {
        const legs = await Leg.find({})

        res.status(200).json({ success: true, data: legs })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const leg = await Leg.create(req.body)
        
        res.status(201).json({ success: true, data: leg })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default: 
      res.status(400).json({ success: false })
      break
  }
}