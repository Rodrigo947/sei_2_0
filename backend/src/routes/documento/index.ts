import { Router } from 'express'
import { assinarDocumento } from './assinar'
import { createDocumento } from './create'

const routersDocumento = Router()

routersDocumento.use(createDocumento)
routersDocumento.use(assinarDocumento)

export default routersDocumento
