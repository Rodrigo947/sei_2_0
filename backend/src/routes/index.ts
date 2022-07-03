import { Router } from 'express'
import routersUser from './user'

const routes = Router()

routes.use('/user', routersUser)

export default routes
