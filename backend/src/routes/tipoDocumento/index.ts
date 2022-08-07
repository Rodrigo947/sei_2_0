import { Router } from 'express'
import { listAllTipoDocumento } from './list'

const routersTipoDocumento = Router()

routersTipoDocumento.use(listAllTipoDocumento)

export default routersTipoDocumento
