import { Router } from 'express';
import { UsersController } from '../controllers/users.js';
var router = Router();
var Users = new UsersController();
router.get('/users', Users.getUsers);
router.post('/users', Users.createUser);
router.get('/users/:email', Users.getUserByEmail);
export { router };