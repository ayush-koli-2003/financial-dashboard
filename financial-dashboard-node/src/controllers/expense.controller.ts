import { NextFunction, Request, Response } from "express";
import { ExpenseService } from "../services/expenses.service";
import { UpdateExpenseDto } from "../dtos/expense/update-expense.dto";
import { AppError } from "../types/app-error";
import { AddExpenseDto } from "../dtos/expense/add-expense.dto";

const expenseService = new ExpenseService();

export const addExpense = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        // body.amount = Number(body.amount);
        let error = await AddExpenseDto.validate(body);
        if(error.isValid){
            let expense = new AddExpenseDto(body);
            let result = await expenseService.addExpense(expense,user,startDate,endDate);

            // if(result){
                
            // }
            // else{
            //     res.json({
            //         status:'failed',
            //         data:'expense add failed'
            //     });
            // }
            // console.log('valid');
            res.status(200).json({
                status:'successfull',
                data:'expense added successfully'
            });
            
        }
        else{
            throw new AppError('Expense data invalid',500);
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getExpenses = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        let user = req.body.user;

        let result = await expenseService.getExpenses(user);

        if(result){
            console.log('got expenses');
            
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
        next(err);
        
    }
}

export const getExpenseByDate = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let search:string = req.query.search as string;
        let limit:number = parseInt(req.query.limit as string) || 6;
        let offset:number = parseInt(req.query.offset as string) || 0;
        let filterBy:string = req.query.filterBy === 'undefined' || undefined? '': req.query.filterBy as string;
        let sortBy:'ASC'|'DESC'|undefined = req.query.sortBy as ('ASC'|'DESC'|undefined);
        
        // console.log(typeof sortBy);
        if(sortBy==='undefined' as unknown as undefined){
            sortBy = undefined
        }
        let result = await expenseService.getExpenseByDateWithLimit(user,startDate,endDate,limit,offset,filterBy,sortBy,search);

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
        next(err);
        
    }
}

export const getTotalExpenseRecords= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let search:string = req.query.search as string;
        let filterBy:string = req.query.filterBy === 'undefined' || undefined? '': req.query.filterBy as string;
        console.log(search);
        
        let result = (await expenseService.getExpenseByDate(user,startDate,endDate,filterBy,search)).length;
        
        res.status(200).json({
            status:200,
            data:result
        })
    }
    catch(err){
        next(err);
    }
}

export const getExpenseById = async(req:Request,res:Response,next:NextFunction)=>{
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
        next(err);
        
    }
}

export const getCategories = async(req:Request,res:Response,next:NextFunction)=>{
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
        next(err);
        
    }
}

export const getTotalExpenseByCategory = async(req:Request,res:Response,next:NextFunction)=>{
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
        next(err);
        
    }
}

export const deleteExpense = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;

        let id = parseInt(req.params.id);

        // console.log(body);
        

        if(!isNaN(id)){

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
        else{
            throw new AppError('ID should be valid',500);
        }
    }
    catch(err){
        next(err);
        
    }
}

export const updateExpenseById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        // body.amount = Number(body.amount);
        let id = parseInt(req.params.id);

        console.log(body);
        

        if(!isNaN(id))
        {   
            body.id = id;
            let error = await UpdateExpenseDto.validate(body);
            if(error.isValid){
                let expense = new UpdateExpenseDto(body);
                let result = await expenseService.updateExpenseById(user,startDate,endDate,expense,id);

                // if(result?.affected as number>0){
                    
                // }
                // else{
                //     res.status(400).json({
                //         status:'failed',
                //         data:'expense update failed'
                //     })
                // }
                // console.log('valid');
                res.status(200).json({
                    status:'successfull',
                    data:'expense updated'
                })
                
            }
            else{
                throw new AppError('Expense data invalid',500);
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
