import express from 'express';
import {LoginUser, AddUser, DeleteUser, VirtualDelete} from '../controllers/user.controller';

const router = express.Router();

router.get('/users/login', LoginUser);
router.post('/users/add', AddUser);
router.delete('/users/:id', DeleteUser);
router.delete('/users/virtual/:id', VirtualDelete);

export default router;