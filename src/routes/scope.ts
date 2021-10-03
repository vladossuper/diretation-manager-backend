import express from 'express';
import { createScope, deleteScope, getScopes, getScopesCreatedByUser, updateScope } from '../controllers/scopeController';

const router = express.Router();

router.post('/scope/create', createScope);
router.get('/scopes/createdByUser', getScopesCreatedByUser);
router.get('/scopes', getScopes);
router.post('/scope/delete', deleteScope);
router.post('/scope/update', updateScope);

export { router as scopeRoute };
