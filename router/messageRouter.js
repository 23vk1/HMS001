import express from 'express';
import { sendMessage, getAllMessages } from '../controller/messageController.js';
import { isAdminAuthanticated } from '../middlewares/auth.js'


const router = express.Router();
router.post('/send', sendMessage);
router.get('/getall', isAdminAuthanticated, getAllMessages);



export default router;