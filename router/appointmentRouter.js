import express from 'express';
import { postAppointment } from '../controller/appointmentController.js';
import { isPatientAuthanticated, isAdminAuthanticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/post',isPatientAuthanticated, postAppointment)




export default router;