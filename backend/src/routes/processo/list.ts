import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()
const listProcessoByUser = Router()
const listProcesso = Router()

listProcessoByUser.get('/all/:idUser', async (req, res) => {
  const idUser = req.query.idUser
  const data = await prisma.processo.findMany({
    select: {
      id_tipo_processo: true,
      protocolo: true,
      nivel_acesso: true,
      tipo_processo: true,
      especificacao: true,
      observacoes: true,
      UsuarioRelacaoProcesso: {
        select: { tipo_relacao: true },
        where: {
          id_usuario: idUser as string,
        },
      },
    },
  })
  return res.status(200).json({ data: data })
})

listProcesso.get('/:idProcesso', async (req, res) => {
  const idProcesso = req.query.idProcesso
  const data = await prisma.processo.findFirst({
    select: {
      id: true,
      especificacao: true,
      observacoes: true,
      nivel_acesso: true,
      Documento: true,
      tipo_processo: true,
      UsuarioRelacaoProcesso: true,
    },
    where: { id: idProcesso as string },
  })
  return res.status(200).json({ data: data })
})

export { listProcessoByUser, listProcesso }
