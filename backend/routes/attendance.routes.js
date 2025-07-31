import express from 'express'
import { attendanceReport, markAttendance, showAttendance, getDetails } from '../controllers/attendance.controller.js';
import checkAttendance from '../middleware/checkAttendance.js';

const router=express.Router();

router.get('/', checkAttendance, getDetails);
router.post('/mark', markAttendance);
router.get('/report', attendanceReport);
router.get('/:id', showAttendance);

export default router;
