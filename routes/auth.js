import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();
router.post('/register', authController.create);
router.post('/authenticate', authController.authenticate);

export default router;