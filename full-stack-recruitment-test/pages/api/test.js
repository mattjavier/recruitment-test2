import connect from '../../utils/connect'

connect()

export default async (req, res) => {
  res.json({ test: 'test' })
}