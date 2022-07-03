import { Router } from 'express'

const removeUser = Router()

removeUser.post('/remove', async (req, res) => {
  const { type, comment, screenshot } = req.body

  return res.status(201).json({ msg: 'Usuário removido' })
})

export { removeUser }
