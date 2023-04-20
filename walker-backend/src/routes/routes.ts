import { Router } from 'express';
import { UserController } from '../controllers/users.js'

const router = Router()

const Users = new UserController()

router.get('/users', Users.getAllUsers)
router.post('/users', Users.createUserAndCoop)
router.get('/users/:email', Users.getUserByEmail)



export { router }