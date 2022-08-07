import { Router } from 'express'
import routersAuth from './auth'
import routersProcesso from './processo'
import routersTipoDocumento from './tipoDocumento'
import routersTipoProcesso from './tipoProcesso'
import routersUnidade from './unidade'
import routersUser from './user'

const routes = Router()

routes.use('/usuario', routersUser)
routes.use('/auth', routersAuth)
routes.use('/tipo-documento', routersTipoDocumento)
routes.use('/tipo-processo', routersTipoProcesso)
routes.use('/processo', routersProcesso)
routes.use('/unidade', routersUnidade)

export default routes
