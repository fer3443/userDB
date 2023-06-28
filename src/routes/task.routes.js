import express from 'express';
import { AddTask, DeleteTask, GetAllTask, GetTaskById, UpdateTask, VirtualDeletedTask } from '../controllers/task.controller';

const router = express.Router();

router.get('/tasks', GetAllTask);
router.get('/tasks/:id', GetTaskById);
router.post('/tasks', AddTask);
router.put('/tasks/:id', UpdateTask);
router.delete('/tasks/:id', DeleteTask);
router.delete('/tasks/virtual/:id', VirtualDeletedTask);

export default router;