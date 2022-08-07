import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const manyTipoProcesso = await prisma.tipoProcesso.createMany({
    data: [
      { nome: 'Adicional Férias', grupo: 'PESSOAL' },
      { nome: 'Aposentadoria', grupo: 'PESSOAL' },
      { nome: 'Controle de Frequência', grupo: 'PESSOAL' },
      { nome: 'Arrecadação', grupo: 'GESTAO' },
      { nome: 'Avaliação de Documentos', grupo: 'GESTAO' },
      { nome: 'Cadastro de Usuário Externo', grupo: 'GESTAO' },
      { nome: 'Credenciamento de Segurança', grupo: 'GESTAO' },
    ],
  })

  const manyTipoDocumento = await prisma.tipoDocumento.createMany({
    data: [{ nome: 'Autorização' }, { nome: 'Externo' }, { nome: 'Ofício' }],
  })

  const unidadeUFMG = await prisma.unidade.create({
    data: {
      nome: 'Universidade Federal de Minas Gerais',
      sigla: 'UFMG',
      cep: '36036900',
      logradouro: 'Rua José Lourenço Kelmer',
      numero: 's/n',
      bairro: 'São Pedro',
      cidade: 'Juiz de Fora',
      uf: 'MG',
      telefone: '(32) 2102-3911',
    },
  })

  const docente = await prisma.usuario.create({
    data: {
      nome: 'Carlos',
      sobrenome: 'Silva',
      email: 'carlos.silva@email.com',
      cpf: '12345678911',
      siape: '123456789',
      senha: '123456789',
      rg: '12654351',
      orgao_expeditor: 'SSP',
      telefone: '5532998752234',
      cep: '36052033',
      logradouro: 'Rua Osvaldo Lourenço',
      numero: '26',
      complemento: 'Apto 502',
      bairro: 'Grama',
      cidade: 'Juiz de Fora',
      uf: 'MG',
    },
  })

  const docente2 = await prisma.usuario.create({
    data: {
      nome: 'José',
      sobrenome: 'Carlos',
      email: 'jose.carlos@email.com',
      cpf: '02345678911',
      siape: '023456789',
      senha: '123456789',
      rg: '02654351',
      orgao_expeditor: 'SSP',
      telefone: '5532998752234',
      cep: '36052033',
      logradouro: 'Rua Osvaldo Lourenço',
      numero: '26',
      complemento: 'Apto 502',
      bairro: 'Grama',
      cidade: 'Juiz de Fora',
      uf: 'MG',
    },
  })

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

  console.log({
    unidade,
    docente,
    manyTipoProcesso,
    manyTipoDocumento,
    unidadeUFMG,
    docente2,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
