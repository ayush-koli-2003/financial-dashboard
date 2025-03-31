import express from 'express';
import { addInvestment, deleteInvestment, getAllInvestments, getInvestmentByDate, getInvestmentById, getInvestmentCategories, updateInvestmentById } from '../controllers/investment.controller';

export const investmentRouter = express.Router();

investmentRouter.get('/',getInvestmentByDate);
investmentRouter.post('/add',addInvestment);
investmentRouter.get('/categories',getInvestmentCategories);
investmentRouter.delete('/delete/:id',deleteInvestment);
investmentRouter.get('/:id',getInvestmentById);
investmentRouter.patch('/update/:id',updateInvestmentById);