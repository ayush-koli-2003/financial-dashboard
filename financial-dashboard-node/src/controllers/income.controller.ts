import { Request, Response } from "express";
import { IncomeService } from "../services/income.service";

const incomeService = new IncomeService();

export const getAllIncomes = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let results = await incomeService.getAllIncomes(user);

        res.json({
            status:'successfull',
            data:results
        })
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

        res.json({
            status:'successfull',
            data:'Income added successfully'
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const getIncomeCategories = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let result = await incomeService.getIncomeCategories(user);

        res.json({
            status:'successfull',
            data : result
        })
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

        res.json({
            status:'successfull',
            data:results
        })
    }
    catch(err){
        console.log(err);
        
    }
}