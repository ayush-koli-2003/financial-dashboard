import express from 'express';
import { activateUser, deactivateUser, getCurrencyCategories, getCurrencyPreference, getProfile, updateProfile } from '../controllers/profile.controller';
import { verifyToken } from '../middlewares/auth.middleware';

export const profileRouter = express.Router();

profileRouter.get('/',verifyToken,getProfile);
profileRouter.post('/update',verifyToken,updateProfile);
profileRouter.get('/currencyCategories',verifyToken,getCurrencyCategories);
profileRouter.get('/getCurrencyPreference',verifyToken,getCurrencyPreference);
profileRouter.get('/deactivate',deactivateUser);
profileRouter.get('/activate',activateUser);