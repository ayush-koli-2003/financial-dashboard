import express from 'express';
import { generateMonthlyReports, generateTrendsReports } from '../controllers/report.controller';
// IMP change all router to named exports
export const reportRouter = express.Router();

reportRouter.get('/monthly',generateMonthlyReports);
reportRouter.get('/trends',generateTrendsReports);
