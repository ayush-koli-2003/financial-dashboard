import express from 'express';
import { addBudget, getAllBudgets, getBudgetByDate, getFilteredCategories, getTotalSpendingOfCategory } from '../controllers/budget.controller';

export const budgetRouter = express.Router();

budgetRouter.get('/',getBudgetByDate);
budgetRouter.post('/add',addBudget);
budgetRouter.get('/filteredCategories',getFilteredCategories);
budgetRouter.get('/getTotalSpendingOfCategory',getTotalSpendingOfCategory)
// router.get('/budgetByDate',);
