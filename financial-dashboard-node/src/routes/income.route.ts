import express from 'express';
import { addIncome, deleteIncome, getAllIncomes, getIncomeById, getIncomeCategories, getIncomesByDate, getTotalIncomeRecords, updateIncomeById } from '../controllers/income.controller';

export const incomeRouter = express.Router();

incomeRouter.get('/',getIncomesByDate);
incomeRouter.get('/total',getTotalIncomeRecords);
incomeRouter.post('/add',addIncome);
incomeRouter.get('/categories',getIncomeCategories);
incomeRouter.delete('/delete/:id',deleteIncome);
incomeRouter.get('/:id',getIncomeById);
incomeRouter.patch('/update/:id',updateIncomeById);