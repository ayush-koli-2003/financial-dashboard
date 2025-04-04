import express from 'express';
import { login, register, logout, changePassword } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/login',login);
userRouter.post('/register',register);
userRouter.get('/logout',logout);
userRouter.post('/changePassword',changePassword);