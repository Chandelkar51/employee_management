import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addDepartment, deleteDepartment, editDepartment, getDepartment, updateDepartment} from '../controllers/departtment.controller.js'

const router=express.Router()

router.post('/add', authMiddleware, addDepartment);
router.get('/', authMiddleware, getDepartment);
router.post('/:id', authMiddleware, editDepartment);
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;