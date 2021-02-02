import connect from '../../../utils/connect'
import { Agent } from '../../../models'

connect() 

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const agents = await Agent.find({})

        res.status(200).json({ success: true, data: agents })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const agent = await Agent.create(req.body)

        res.status(201).json({ success: true, data: agent })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}