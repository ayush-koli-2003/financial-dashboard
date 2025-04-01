import express from 'express';
import {userRouter} from './routes/user.route';
import {expenseRouter} from './routes/expense.route';
import {incomeRouter} from './routes/income.route';
import {investmentRouter} from './routes/investment.route';
import { verifyToken } from './middlewares/auth.middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { parseDate } from './middlewares/date.middleware';
import { reportRouter } from './routes/report.route';
import { budgetRouter } from './routes/budget.route';
import { profileRouter } from './routes/profile.route';

const app = express();
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:4200"}));
app.use(cookieParser());

app.use('/auth',userRouter);
app.use('/api/expense',verifyToken,parseDate,expenseRouter);
app.use('/api/budget',verifyToken,parseDate,budgetRouter); 
app.use('/api/income',verifyToken,parseDate,incomeRouter);
app.use('/api/investment',verifyToken,parseDate,investmentRouter);
app.use('/api/report',verifyToken,parseDate,reportRouter);
app.use('/api/profile',verifyToken,profileRouter);

export default app; 