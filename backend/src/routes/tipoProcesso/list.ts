import { Grupo, PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()

const listAllTipoProcesso = Router()

const enumText = {
  GESTAO: 'Gestão',
  PESSOAL: 'Pessoal',
}

listAllTipoProcesso.post('/list', async (req, res) => {
  let result: any = []

  for (const enumKey of Object.keys(enumText)) {
    const tiposProcesso = await prisma.tipoProcesso.findMany({
      where: {
        grupo: enumKey as Grupo,
      },
      select: {
        id: true,
        nome: true,
      },
      orderBy: { nome: 'asc' },
    })

    result.push({
      grupo: enumText[enumKey as Grupo],
      tipos: tiposProcesso,
    })
  }

  return res.status(200).json({ msg: '-', data: result })
})

export { listAllTipoProcesso }
