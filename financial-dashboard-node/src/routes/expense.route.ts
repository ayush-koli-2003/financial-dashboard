import express from 'express';
import { addExpense, deleteExpense, getCategories, getExpenseByDate, getExpenses, getTotalExpenseByCategory, getExpenseById, updateExpenseById, getTotalExpenseRecords } from '../controllers/expense.controller';

export const expenseRouter = express.Router();

expenseRouter.get('/',getExpenseByDate);
expenseRouter.get('/total',getTotalExpenseRecords);
expenseRouter.post('/add',addExpense);
expenseRouter.get('/categories',getCategories);
expenseRouter.get('/getTotalByCategory',getTotalExpenseByCategory);
expenseRouter.delete('/delete/:id',deleteExpense);
expenseRouter.get('/:id',getExpenseById);
expenseRouter.patch('/update/:id',updateExpenseById);