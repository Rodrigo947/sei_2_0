import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const unidade = await prisma.unidade.create({
    data: {
      nome: 'Universidade Federal de Juiz de Fora',
      sigla: 'UFJF',
      cep: '36036900',
      logradouro: 'Rua José Lourenço Kelmer',
      numero: 's/n',
      bairro: 'São Pedro',
      cidade: 'Juiz de Fora',
      uf: 'MG',
      telefone: '(32) 2102-3911',
    },
  })
  console.log({ unidade })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
