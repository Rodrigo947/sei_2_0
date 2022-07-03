import { Router } from 'express'

const updateUser = Router()

updateUser.post('/update', async (req, res) => {
  const { type, comment, screenshot } = req.body

  return res.status(201).json({ msg: 'Usuário alterado' })
})

export { updateUser }
