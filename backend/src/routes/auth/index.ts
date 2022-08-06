import { Router } from 'express'
import { loginAuth } from './login'

const routersAuth = Router()

routersAuth.use(loginAuth)

export default routersAuth
