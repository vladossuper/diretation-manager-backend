import express from 'express';

import { createTask, deleteTask, getTasksCreatedByLeader, getTasksForStudent, updateTask } from '../controllers/taskController';

const router = express.Router();

router.post('/task/create', createTask);
router.get('/tasks/createdByLeader', getTasksCreatedByLeader);
router.get('/tasks/createdForStudent', getTasksForStudent);
router.post('/task/delete', deleteTask);
router.post('/task/update', updateTask);

export { router as taskRoute };

