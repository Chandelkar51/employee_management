import express from 'express'
import {forgetPassword, login, registration} from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/authMiddleware.js'
import { verify } from '../middleware/authMiddleware.js';
import { upload } from '../controllers/employee.controller.js';
const router=express.Router();

router.post('/login', login);
router.post('/register', upload.single("profileImage"), registration);
router.post('/verify', authMiddleware, verify);
router.put('/forget-password', forgetPassword);

export default router;