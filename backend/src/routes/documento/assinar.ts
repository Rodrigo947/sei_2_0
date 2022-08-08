import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()
const assinarDocumento = Router()

assinarDocumento.post('/assinar', async (req, res) => {
  const { id_usuario, senha, id_documento } = req.body

  const user = await prisma.usuario.findFirst({
    where: { id: id_usuario, senha: senha },
  })

  if (!user) {
    return res.status(404).json({ msg: 'Senha incorreta' })
  }

  await prisma.assinaturaDocumentoUsuario.create({
    data: {
      id_documento: id_documento,
      id_usuario: id_usuario,
    },
  })

  return res.status(201).json({ msg: 'Documento assinado' })
})

export { assinarDocumento }
