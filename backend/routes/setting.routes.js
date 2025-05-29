import express  from 'express'
import authMeddileware from '../middleware/authMiddleware.js'
import {changePassword} from '../controllers/setting.controller.js'

const router=express.Router();

router.put('/change-password', authMeddileware, changePassword)

export default router;
