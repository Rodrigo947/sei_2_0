import { Router } from 'express'
import routersAuth from './auth'
import routersUser from './user'

const routes = Router()

routes.use('/user', routersUser)
routes.use('/auth', routersAuth)

export default routes
