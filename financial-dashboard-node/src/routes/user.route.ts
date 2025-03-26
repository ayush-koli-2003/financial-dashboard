import express from 'express';
import { login, register, logout } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/login',login);
userRouter.post('/register',register);
userRouter.get('/logout',logout)