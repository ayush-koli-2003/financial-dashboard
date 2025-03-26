import { Request, Response } from "express";
import { ExpenseService } from "../services/expenses.service";

const expenseService = new ExpenseService();

export const addExpense = async(req:Request,res:Response)=>{
    try{
        let expense = req.body;
        expense.amount = parseFloat(expense.amount);
        let user = req.body.user;

        let result = await expenseService.addExpense(expense,user);

        res.json({
            status:'successfull',
            data:'data added successfully'
        });
    }
    catch(err){
        console.log(err);
        
    }
}

export const getExpenses = async(req:Request,res:Response)=>{
    try{

        let user = req.body.user;

        let result = await expenseService.getExpenses(user);

        res.json({
            status:'successfull',
            data:result
        });
    }
    catch(err){
        console.log(err);
        
    }
}

export const getExpenseByDate = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        

        let result = await expenseService.getExpenseByDate(user,startDate,endDate);

        res.json({
            status:'successfull',
            data:result
        });
    }
    catch(err){
        console.log(err);
        
    }
}

export const getCategories = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let results = await expenseService.getExpenseCategories(user);

        res.json({
            status:'successfull',
            data:results
        })
    }
    catch(err){
        console.log(err);
        
    }
}
