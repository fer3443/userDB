import express from 'express';
import { AddTask, DeleteTask, GetAllTask, GetTaskById, UpdateTask, VirtualDeletedTask } from '../controllers/task.controller';
import { Authenticate } from '../helpers/token.helper';

const router = express.Router();

router.get('/tasks', Authenticate, GetAllTask);
router.get('/tasks/:id', Authenticate, GetTaskById);
router.post('/tasks', Authenticate, AddTask);
router.put('/tasks/:id', Authenticate, UpdateTask);
router.delete('/tasks/:id', Authenticate, DeleteTask);
router.delete('/tasks/virtual/:id', Authenticate, VirtualDeletedTask);

export default router;