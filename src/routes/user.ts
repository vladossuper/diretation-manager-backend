import express from 'express';

import { user, users } from '../controllers/userController';

const router = express.Router();

router.get('/user', user);
router.get('/users', users);

export { router as userRouter };

