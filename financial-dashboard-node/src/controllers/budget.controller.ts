import { Request, Response, NextFunction } from "express";
import { BudgetService } from "../services/budget.service";
import { BudgetCategory } from "../enums/budget.enum";
import { RequestBudgetDto } from "../dtos/budget/request-budget.dto";
import { AppError } from "../types/app-error";
import { AddBudgetDto } from "../dtos/budget/add.dto";
import { UpdateBudgetDto } from "../dtos/budget/update.dto";
import { UpdateExpenseDto } from "../dtos/expense/update-expense.dto";

const budgetService = new BudgetService();
export const getAllBudgets = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let budget = req.body;
        // budget.amount = parseFloat(budget.amount);
        let user = req.body.user;

        let results = await budgetService.getAllBudgets(user);

        res.status(200).json({
            status:'successfull',
            data:results
        })
    }
    catch(err){
        next(err);
        
    }
}

export const addBudget = async(req:Request,res:Response,next:NextFunction)=>{
    try{   
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        console.log(body);
        
        
        let error = await AddBudgetDto.validate(body);

        if(!error.isValid){
            throw new AppError('Add Budget data invalid',500);
        }
        else{
            let budget = new AddBudgetDto(body);
            let results = await budgetService.createBudget(budget,user);

            if(results){
                res.status(200).json({
                    status:'successfull',
                    data:'Budget is added'
                })
            }
            else{
                res.status(400).json({
                    status:'failed',
                    data:'Budget is not added'
                })
            }
            // console.log('valid data');
            
        }
        
        
    }
    catch(err){
        next(err);
        
    }
}

export const getCategories = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let results = await budgetService.getAllCategories();

        if(results){
            res.status(200).json({
                status:"successfull",
                data:results
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data:'get categories failed'
            })
        }
    }
    catch(err){
        next(err);
    }
}

export const getFilteredCategories = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let results = await budgetService.getFilteredCategories(user);

        if(results){
            res.status(200).json({
                status:"successfull",
                data:results
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data:'get categories failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getBudgetByDate = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let budgets = await budgetService.getBudgetByDate(user,startDate,endDate);
        // console.log(budgets);
        // let budgetsByCat:{category:BudgetCategory,amount:number}[] = new Array();
        // if(budgets){
        //     budgets.map(b=>{
        //         budgetsByCat.push({category:b.category,amount:b.amount})
        //     })
        // }
        
        if(budgets){
            res.status(200).json({
                status:'successfull',
                data:budgets
            });
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'get budgets by date failed'
            });
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getTotalSpendingOfCategory = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let result = await budgetService.getTotalSpendingOfCategory(user,startDate,endDate);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
        else{
            res.json({
                status:'failed',
                data:'get total spending failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const deleteBudget = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let id = parseInt(req.params.id);
        // console.log(id);

        if(!isNaN(id)){
            let result = await budgetService.deleteBudget(user,id);

            res.status(200).json({
                status:'successfull',
                data:'budget is deleted'
            })
            console.log("valid");
            
        }
        else{
            throw new AppError('ID should be number',500);
        }
        
    }
    catch(err){
        next(err);
        
    }
}

export const getBudgetById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let id = parseInt(req.params.id);
        // console.log(id);

        if(!isNaN(id)){
            let result = await budgetService.getBudgetById(id);

            if(result){
                res.status(200).json({
                    status:'successfull',
                    data:result
                })
            }
            else{
                res.status(400).json({
                    status:'failed',
                    data:'no budget found'
                })
            }
        }
        else{
            throw new AppError('ID should be number',500);
        }

        
    }
    catch(err){
        next(err);
        
    }
}

export const updateBudgetById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        // body.amount = Number(body.amount);
        let id = parseInt(req.params.id);

        
        

        if(!isNaN(id)){
            body.id = id;
            console.log('Body: ');
            
            console.log(body);
            let error = await UpdateBudgetDto.validate({id:body.id,amount:body.amount});

            if(!error.isValid){
                throw new AppError('Budget data invalid',500);
            }
            else{
                let budget = new UpdateBudgetDto(body);
                let result = await budgetService.updateBudgetById(budget,budget.id);

                res.status(200).json({
                    status:'successfull',
                    data:'budget updated'
                })
                // console.log("valid");
                
            }
        }
        else{
            throw new AppError('ID should be number',500);
        }
    }
    catch(err){
        next(err);
        
    }
}