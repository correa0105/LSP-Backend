import { Router } from 'express';

import authRequired from '../middlewares/authRequired';
import ProcessController from '../controllers/ProcessController';

const router = new Router();

router.post('/', authRequired, ProcessController.store);
router.get('/', authRequired, ProcessController.index);
router.get('/myprocess/:id', authRequired, ProcessController.show);
router.put('/myprocess/:id', authRequired, ProcessController.update);
router.delete('/:id', authRequired, ProcessController.delete);

export default router;
