import { Request, Response } from "express";
import { ExpenseService } from "../services/expenses.service";

const expenseService = new ExpenseService();

export const addExpense = async(req:Request,res:Response)=>{
    try{
        let expense = req.body;
        expense.amount = parseFloat(expense.amount);
        let user = req.body.user;

        let result = await expenseService.addExpense(expense,user);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:'expense added successfully'
            });
        }
        else{
            res.json({
                status:'failed',
                data:'expense add failed'
            });
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const getExpenses = async(req:Request,res:Response)=>{
    try{

        let user = req.body.user;

        let result = await expenseService.getExpenses(user);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            });
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'get expenses failed'
            });
        }
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

        if(result){
            res.status(200).json({
                status:'successfull', 
                data:result
            });
        }
        else{
            res.status(400).json({
                status:'failed', 
                data:'get expense by date failed'
            });
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const getExpenseById = async(req:Request,res:Response)=>{
    try{
        let id = req.params.id;
        let user = req.body.user;

        let result = await expenseService.getExpenseById(id);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'no expense found'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const getCategories = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let results = await expenseService.getExpenseCategories(user);

        if(results){
            res.status(200).json({
                status:'successfull',
                data:results
            })
        }
        else{
            res.status(400).json({
                status:'successfull',
                data:'get categories failed'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const getTotalExpenseByCategory = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let result = await expenseService.getTotalExpenseByCategory(user,startDate,endDate);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:"get total expense by category failed"
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const deleteExpense = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;
        let id = req.params.id;

        let result = await expenseService.deleteExpense(user,id);

        if(result?.affected as number>0){
            res.status(200).json({
                status:'successfull',
                data:'Expense deleted'
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'Expense not deleted'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const updateExpenseById = async(req:Request,res:Response)=>{
    try{
        let expense = req.body;
        let user = req.body.user;
        let id = req.params.id;

        let result = await expenseService.updateExpenseById(expense,id);

        if(result?.affected as number>0){
            res.status(200).json({
                status:'successfull',
                data:'expense updated'
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'expense update failed'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}
