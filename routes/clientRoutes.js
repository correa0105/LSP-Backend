import { Router } from 'express';

import authRequired from '../middlewares/authRequired';
import ClientController from '../controllers/ClientController';

const router = new Router();

router.post('/', authRequired, ClientController.store);
router.get('/', authRequired, ClientController.index);
router.get('/:id', authRequired, ClientController.show);
router.put('/:id', authRequired, ClientController.update);
router.delete('/:id', authRequired, ClientController.delete);

export default router;
