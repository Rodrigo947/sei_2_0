import { Router } from 'express'
import { listAllTipoProcesso } from './list'

const routersTipoProcesso = Router()

routersTipoProcesso.use(listAllTipoProcesso)

export default routersTipoProcesso
