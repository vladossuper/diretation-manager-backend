import express from 'express';
import { deleteFile, download, getFilesForTask, uploadFile } from '../controllers/fileController';

const router = express.Router();
 
router.post('/upload', uploadFile);
router.get('/files/getForTask', getFilesForTask);
router.get('/file/download', download);
router.post('/file/delete', deleteFile);

export { router as fileRouter };
