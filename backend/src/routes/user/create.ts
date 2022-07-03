import { Router } from 'express'

const createUser = Router()

createUser.post('/create', async (req, res) => {
  const { type, comment, screenshot } = req.body

  return res.status(201).json({ msg: 'Usuário criado' })
})

export { createUser }
