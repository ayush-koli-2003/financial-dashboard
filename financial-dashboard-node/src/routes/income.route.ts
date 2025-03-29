import express from 'express';
import { addIncome, deleteIncome, getAllIncomes, getIncomeCategories, getIncomesByDate } from '../controllers/income.controller';

export const incomeRouter = express.Router();

incomeRouter.get('/',getIncomesByDate);
incomeRouter.post('/add',addIncome);
incomeRouter.get('/categories',getIncomeCategories);
incomeRouter.delete('/delete/:id',deleteIncome);