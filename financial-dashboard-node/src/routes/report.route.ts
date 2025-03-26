import express from 'express';
import { generateReports } from '../controllers/report.controller';
// IMP change all router to named exports
export const reportRouter = express.Router();

reportRouter.get('/',generateReports);
