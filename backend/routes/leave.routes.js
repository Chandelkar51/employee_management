import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { NewLeave, getLeaves, fetchLeaves, changeStatus } from '../controllers/leave.controller.js';

const router=express.Router();

router.post('/apply', authMiddleware, NewLeave)
router.get('/:id', authMiddleware, getLeaves)
router.get('/', authMiddleware, fetchLeaves)
router.put('/status/:id', authMiddleware, changeStatus)

export default router;