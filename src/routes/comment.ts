import express from 'express';
import { createComment, deleteComment, getCommentByTask } from '../controllers/commentController';

const router = express.Router();

router.post('/comment/create', createComment);
router.post('/comment/delete', deleteComment);
router.get('/comment/getByTask', getCommentByTask);

export { router as commentRoute }