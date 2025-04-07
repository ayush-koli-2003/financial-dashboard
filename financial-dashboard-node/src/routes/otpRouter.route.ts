import express from 'express';
import { generateOtp } from '../controllers/otp.controller';

export const otpRouter = express.Router();

otpRouter.post('/generate',generateOtp);