import { Router } from 'express'
import { createProcesso } from './create'

const routersProcesso = Router()

routersProcesso.use(createProcesso)

export default routersProcesso
