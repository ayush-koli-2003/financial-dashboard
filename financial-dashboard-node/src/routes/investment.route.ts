import express from 'express';
import { addInvestment, getAllInvestments, getInvestmentByDate, getInvestmentCategories } from '../controllers/investment.controller';

export const investmentRouter = express.Router();

investmentRouter.get('/',getInvestmentByDate);
investmentRouter.post('/add',addInvestment);
investmentRouter.get('/categories',getInvestmentCategories);