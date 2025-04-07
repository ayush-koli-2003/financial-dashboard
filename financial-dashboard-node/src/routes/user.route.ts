import express from 'express';
import { login, register, logout, changePassword } from '../controllers/user.controller';
import { verifyOtp } from '../middlewares/verifyOtp.middleware';

export const userRouter = express.Router();

userRouter.post('/login',login);
userRouter.post('/register',verifyOtp,register);
userRouter.get('/logout',logout);
userRouter.post('/changePassword',changePassword);