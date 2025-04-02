import express from 'express';
import { getDashboardData, getDashboardTransactions } from '../controllers/dashboard.controller';

export const dashboardRouter = express.Router();

dashboardRouter.get('/',getDashboardData);
dashboardRouter.get('/transactions',getDashboardTransactions);