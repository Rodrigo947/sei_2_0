import { NivelAcesso, PrismaClient, TipoRelacao } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()
const createProcesso = Router()

interface IProcesso {
  id_tipo_processo: string
  especificacao: string
  observacoes: string
  nivel_acesso: string
}

createProcesso.post('/create', async (req, res) => {
  const id_usuario: string = req.body.id_usuario
  const dataProcesso: IProcesso = req.body.processo
  const dataUsuariosInteressados = req.body.usuariosInteressados
  const dataDocumentos = req.body.documentos

  const novoProcesso = await prisma.processo.create({
    data: {
      id_tipo_processo: dataProcesso.id_tipo_processo,
      especificacao: dataProcesso.especificacao,
      observacoes: dataProcesso.observacoes,
      nivel_acesso: dataProcesso.nivel_acesso as NivelAcesso,
      Documento: {
        createMany: {
          data: dataDocumentos,
        },
      },
    },
  })

  await prisma.usuarioRelacaoProcesso.create({
    data: {
      id_usuario: id_usuario,
      id_processo: novoProcesso.id,
      motivo: '-',
      tipo_relacao: TipoRelacao.PROPRIETARIO,
    },
  })

  for (const id of dataUsuariosInteressados) {
    await prisma.usuarioRelacaoProcesso.create({
      data: {
        id_usuario: id,
        id_processo: novoProcesso.id,
        motivo: '-',
        tipo_relacao: TipoRelacao.INTERESSADO,
      },
    })
  }

  return res.status(201).json({ msg: 'Processo criado' })
})

export { createProcesso }
