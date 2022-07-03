import { Router } from 'express'
import { createUser } from './create'
import { listUser } from './list'
import { removeUser } from './remove'
import { updateUser } from './update'

const routersUser = Router()

routersUser.use(createUser)
routersUser.use(listUser)
routersUser.use(removeUser)
routersUser.use(updateUser)


export default routersUser
