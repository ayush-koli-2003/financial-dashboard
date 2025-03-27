import { Request, Response } from "express";
import { ReportService } from "../services/report.service";

const reportService = new ReportService();

export const generateReports = async(req:Request,res:Response)=>{
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
        console.log(err);
        
    }
}