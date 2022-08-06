import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()

const loginAuth = Router()

interface ILogin {
  matriculaSiape: string
  senha: string
}

loginAuth.post('/login', async (req, res) => {
  const { matriculaSiape, senha }: ILogin = req.body

  const user = await prisma.usuario.findFirst({
    where: {
      OR: [
        { siape: matriculaSiape, senha: senha },
        { matricula: matriculaSiape, senha: senha },
      ],
    },
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      email: true,
      matricula: true,
      siape: true,
    },
  })

  if (user === null) {
    return res.status(401).json({ msg: 'Login ou senha incorretos' })
  }

  return res.status(200).json({ msg: 'Login correto', data: user })
})

export { loginAuth }
