import { Request, Response } from "express";
import { InvestmentService } from "../services/investment.service";

const investmentService = new InvestmentService();

export const getAllInvestments = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let results = await investmentService.getInvestments(user);

        res.json({
            status:'successfull',
            data:results
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const addInvestment = async(req:Request,res:Response)=>{
    try{
        let investment = req.body;
        let user = req.body.user;
        let result = await investmentService.addInvestment(investment,user);

        res.json({
            status:'successfull',
            data: result
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const getInvestmentCategories = async(req:Request,res:Response)=>{ 
    try{
        let user = req.body.user;
        let result = await investmentService.getInvestmentCategories(user);
        res.json({
            status:"successfull",
            data: result
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const getInvestmentByDate = async(req:Request,res:Response)=>{ 
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let result = await investmentService.getInvestmentsByDate(user,startDate,endDate);
        res.json({
            status:"successfull",
            data: result
        })
    }
    catch(err){
        console.log(err);
        
    }
}