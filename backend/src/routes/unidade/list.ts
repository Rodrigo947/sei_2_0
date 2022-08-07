import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()
const listAllUnidade = Router()

listAllUnidade.post('/all', async (req, res) => {
  const unidades = await prisma.unidade.findMany({
    select: {
      id: true,
      nome: true,
      sigla: true,
    },

    orderBy: { nome: 'asc' },
  })

  return res.status(201).json({ msg: '', data: unidades })
})

export { listAllUnidade }
