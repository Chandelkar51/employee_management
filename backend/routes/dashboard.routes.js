import Express from 'express'
import AuthMiddileware from '../middleware/authMiddleware.js'
import { getSummary } from '../controllers/dashboard.controller.js';

const router=Express.Router();

router.get('/summary', AuthMiddileware, getSummary)

export default router;