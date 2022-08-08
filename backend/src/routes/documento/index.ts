import { Router } from 'express'
import { createDocumento } from './create'

const routersDocumento = Router()

routersDocumento.use(createDocumento)

export default routersDocumento
