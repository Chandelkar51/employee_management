import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { salary, getSalary } from '../controllers/salary.controller.js';

const router=express.Router();

router.post('/add/:id', authMiddleware, salary)
router.get('/:id', authMiddleware, getSalary)

export default router;