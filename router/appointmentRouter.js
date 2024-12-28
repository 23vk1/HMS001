import express from 'express';
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from '../controller/appointmentController.js';
import { isPatientAuthanticated, isAdminAuthanticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/post',isPatientAuthanticated, postAppointment)
router.get('/getall',isAdminAuthanticated, getAllAppointment)
router.put('/update/:id',isAdminAuthanticated, updateAppointmentStatus)
router.delete('/delete/:id',isAdminAuthanticated, deleteAppointment)


export default router;