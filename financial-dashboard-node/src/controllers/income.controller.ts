import { Request, Response } from "express";
import { IncomeService } from "../services/income.service";

const incomeService = new IncomeService();

export const getAllIncomes = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let results = await incomeService.getAllIncomes(user);

        if(results){
            res.status(200).json({
                status:'successfull',
                data:results
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'get incomes failed'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const addIncome = async(req:Request,res:Response)=>{
    try{
        let income = req.body;
        let user = req.body.user;

        let results = await incomeService.addIncome(income,user);

        if(results){
            res.status(200).json({
                status:'successfull',
                data:'Income added successfully'
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'Income add failed'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const getIncomeCategories = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let result = await incomeService.getIncomeCategories(user);

        if(result){
            res.status(200).json({
                status:'successfull',
                data : result
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data : 'get income categories failed'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const getIncomesByDate = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let results = await incomeService.getIncomesByDate(user,startDate,endDate);

        if(results){
            res.status(200).json({
                status:'successfull',
                data:results
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'get income by date failed'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}

export const deleteIncome = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;
        let id = req.params.id;

        let result = await incomeService.deleteIncome(user,id);

        if(result?.affected as number > 0){
            res.status(200).json({
                status:"successfull",
                data:'income deleted'
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data:'income not deleted'
            })
        }
    }
    catch(err){
        console.log(err);
        
    }
}