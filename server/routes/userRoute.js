import express from 'express';
import { login, sendOtpForSignup, signup } from '../controllers/userController.js';
import { upload } from '../config/cloudinary.js';


const router = express.Router();


router.post('/signup',upload.none(),signup)
router.post('/sendOtp',sendOtpForSignup)
router.post('/login',login);



export default router