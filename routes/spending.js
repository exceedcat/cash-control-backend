import express from 'express';
import spendingController from '../controllers/spending';

const router = express.Router();
router.post('/:userId/spendings', spendingController.create);
router.patch('/:userId/spendings/:spendingId', spendingController.edit);
router.delete('/:userId/spendings/:spendingId', spendingController.remove);

export default router;