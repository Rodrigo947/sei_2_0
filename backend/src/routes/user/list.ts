import { Router } from 'express'

const listUser = Router()

listUser.post('/all', async (req, res) => {
  const { type, comment, screenshot } = req.body

  return res.status(201).json({ msg: 'All' })
})

listUser.post('/:id', async (req, res) => {
  const { cpf, email, senha } = req.body
  let t = req.params.id
  return res.status(201).json({ msg: 'id' })
})

export { listUser }
