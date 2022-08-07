import { Router } from 'express'

const createProcesso = Router()

createProcesso.post('/create', async (req, res) => {
  console.log(req.body)

  return res.status(201).json({ msg: 'Processo criado' })
})

export { createProcesso }
