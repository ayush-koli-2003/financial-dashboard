import express from 'express';
import { changeStatus, getAdminDashboardData, getAllUsers } from '../controllers/admin-dashboard.controller';

export const adminRouter = express.Router();

adminRouter.get('/dashboardData',getAdminDashboardData);
adminRouter.get('/allUsers',getAllUsers);
adminRouter.get('/changeStatus/:id',changeStatus);