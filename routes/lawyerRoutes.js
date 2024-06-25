import { Router } from 'express';

import lawyerController from '../controllers/LawyerController';
import authRequired from '../middlewares/authRequired';

const router = new Router();

router.post('/', lawyerController.store);
router.get('/', authRequired, lawyerController.show);
router.put('/', authRequired, lawyerController.update);
router.delete('/', authRequired, lawyerController.delete);

export default router;
