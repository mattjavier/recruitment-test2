import connect from '../../../utils/db'
import Itinerary from '../../../models/Itinerary'
import Leg from '../../../models/Leg'

const handler = async (req, res) => {
  const { method } = req
  
  await connect()

  switch (method) {
    case 'GET': 
    
  }
}

export default handler