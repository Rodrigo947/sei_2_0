import { Router } from 'express'
import { createProcesso } from './create'
import { listProcesso, listProcessoByUser } from './list'

const routersProcesso = Router()

routersProcesso.use(createProcesso)
routersProcesso.use(listProcesso)
routersProcesso.use(listProcessoByUser)

export default routersProcesso
