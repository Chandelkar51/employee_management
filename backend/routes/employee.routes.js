import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, getSingleEmployee, editEmployee, departmentEmployees, } from '../controllers/employee.controller.js';

const router=express.Router();

router.post('/add', authMiddleware, upload.single("profileImage"), addEmployee)
router.get('/', authMiddleware, getEmployees)
router.get('/:id', authMiddleware, getSingleEmployee)
router.put('/edit/:id', authMiddleware, editEmployee)
router.get('/department/:id', authMiddleware, departmentEmployees)

export default router;