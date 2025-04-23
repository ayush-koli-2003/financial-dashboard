import { NextFunction, Request, Response } from "express";
import { ReportService } from "../services/report.service";

const reportService = new ReportService();

export const generateMonthlyReports = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let expenseReport = await reportService.getExpenseReport(user,startDate,endDate);
        // let incomeReport = await reportService.getIncomeReport(user,startDate,endDate);

        let budgetVsExpense = await reportService.getBudgetVsExpense(user,startDate,endDate);

        res.json({
            status:'successfull',
            data:{
                budgetVsExpense,
                expenseReport
            }
        })
    }
    catch(err){
        next(err);
        
    }
}

export const generateTrendsReports = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let pastMonths = parseInt(req.query.pastMonths as string);
        // let expenseReport = await reportService.getExpenseReport(user,startDate,endDate);
        // let incomeReport = await reportService.getIncomeReport(user,startDate,endDate);

        // let budgetVsExpense = await reportService.getBudgetVsExpense(user,startDate,endDate);
        let incomeVsExpenseTrend = await reportService.getIncomeVsExpenseTrend(user,startDate,endDate,pastMonths);
        let savingsTrend = await reportService.getSavingsTrend(user,startDate,endDate,pastMonths);
        res.json({
            status:'successfull',
            data:{
                incomeVsExpenseTrend,
                savingsTrend
            }
        })
    }
    catch(err){
        next(err);
        
    }
}

export const downloadMonthlyReport = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        
        // let result = await reportService.generateExpenseReportCSV(user,startDate,endDate);
        // console.log(result);

        let result = await reportService.generateMonthlyReportPdf(user,startDate,endDate);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
        res.send(Buffer.from(result, 'binary'));
        
    }
    catch(err){
        next(err);
        
    }
}