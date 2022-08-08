import { NivelAcesso, PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()
const createDocumento = Router()

interface IDocumento {
  nome_arquivo: string
  observacao: string
  id_tipo_documento: string
  nivel_de_acesso: NivelAcesso
  id_usuario_criador: string
  id_processo: string
}

createDocumento.post('/create', async (req, res) => {
  const dataDocumento: IDocumento = req.body

  await prisma.documento.create({
    data: dataDocumento,
  })

  return res.status(201).json({ msg: 'Documento adicionado' })
})

export { createDocumento }
