import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()
const listUser = Router()

listUser.post('/all', async (req, res) => {
  const idsToExclude = req.body.ids
  const usuarios = await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      sobrenome: true,
    },
    where: { id: { not: idsToExclude } },
    orderBy: [{ nome: 'asc' }, { sobrenome: 'asc' }],
  })

  return res.status(201).json({ msg: '', data: usuarios })
})

listUser.post('/me', async (req, res) => {
  const id = req.headers.authorization?.split(' ')[1]
  const data = await prisma.usuario.findUnique({
    where: { id: id },
  })
  return res.status(200).json(data)
})

export { listUser }
