import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()

const listAllTipoDocumento = Router()

listAllTipoDocumento.post('/list', async (req, res) => {
  const tiposDocumento = await prisma.tipoDocumento.findMany()

  return res.status(200).json({ msg: '-', data: tiposDocumento })
})

export { listAllTipoDocumento }
