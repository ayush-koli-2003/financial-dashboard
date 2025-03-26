import express from 'express';
import { addExpense, getCategories, getExpenseByDate, getExpenses } from '../controllers/expense.controller';

export const expenseRouter = express.Router();

expenseRouter.get('/',getExpenseByDate);
expenseRouter.post('/add',addExpense);
expenseRouter.get('/categories',getCategories)
expenseRouter.delete('/delete')