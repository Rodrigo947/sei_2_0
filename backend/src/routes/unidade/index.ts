import { Router } from 'express'

import { listAllUnidade } from './list'

const routersUnidade = Router()

routersUnidade.use(listAllUnidade)

export default routersUnidade
