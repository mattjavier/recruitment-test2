import connect from '../../../utils/connect'
import { Agent } from '../../../models'

connect()

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req
  
  switch (method) {
    case 'GET':
      try {
        const agent = await Agent.findById(id)

        if (!agent) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: agent })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}