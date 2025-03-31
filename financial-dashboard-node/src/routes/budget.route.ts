import express from 'express';
import { addBudget, deleteBudget, getAllBudgets, getCategories, getBudgetByDate, getBudgetById, getFilteredCategories, getTotalSpendingOfCategory, updateBudgetById } from '../controllers/budget.controller';

export const budgetRouter = express.Router();

budgetRouter.get('/',getBudgetByDate);
budgetRouter.post('/add',addBudget);
budgetRouter.get('/filteredCategories',getFilteredCategories);
budgetRouter.get('/categories',getCategories);
budgetRouter.get('/getTotalSpendingOfCategory',getTotalSpendingOfCategory)
budgetRouter.delete('/delete/:id',deleteBudget);
budgetRouter.get('/:id',getBudgetById);
budgetRouter.patch('/update/:id',updateBudgetById);
// router.get('/budgetByDate',);
