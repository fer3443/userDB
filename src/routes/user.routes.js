import express from 'express';
import {GetAllUsers, AddUser, UpdateUser, DeleteUser, GetUserById, VirtualDelete} from '../controllers/user.controller';

const router = express.Router();

router.get('/users', GetAllUsers);
router.get('/users/:id', GetUserById);
router.post('/users', AddUser);
router.put('/users/:id', UpdateUser);
router.delete('/users/:id', DeleteUser);
router.delete('/users/virtual/:id', VirtualDelete);

export default router;