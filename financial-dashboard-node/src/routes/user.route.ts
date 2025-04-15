import express from 'express';
import { login, register, logout, changePassword, forgotPassword } from '../controllers/user.controller';
import { verifyOtp } from '../middlewares/verifyOtp.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

export const userRouter = express.Router();

userRouter.post('/login',login);
userRouter.post('/register',verifyOtp,register);
userRouter.get('/logout',logout);
userRouter.post('/changePassword',verifyToken,changePassword);
userRouter.post('/forgotPassword',verifyOtp,forgotPassword);