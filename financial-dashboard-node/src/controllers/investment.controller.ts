import { NextFunction, Request, Response } from "express";
import { InvestmentService } from "../services/investment.service";

const investmentService = new InvestmentService();

export const getAllInvestments = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;

        let results = await investmentService.getInvestments(user);

        if(results){
            res.status(200).json({
                status:'successfull',
                data:results
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'get investments failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const addInvestment = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let investment = req.body;
        let user = req.body.user;
        let result = await investmentService.addInvestment(investment,user);

        if(result){
            res.status(200).json({
                status:'successfull',
                data: result
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data: 'add investment failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getInvestmentCategories = async(req:Request,res:Response,next:NextFunction)=>{ 
    try{
        let user = req.body.user;
        let result = await investmentService.getInvestmentCategories(user);
        if(result){
            res.status(200).json({
                status:"successfull",
                data: result
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data: 'get investment categories failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getInvestmentByDate = async(req:Request,res:Response,next:NextFunction)=>{ 
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let result = await investmentService.getInvestmentsByDate(user,startDate,endDate);
        if(result){
            res.status(200).json({
                status:"successfull",
                data: result
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data: 'get investment by date failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const deleteInvestment = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let id = req.params.id;

        let result = await investmentService.deleteInvestment(user,id);

        if(result?.affected as number>0){
            res.status(200).json({
                status:"successfull",
                data:'investment deleted'
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data:'investment delete failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getInvestmentById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let id = req.params.id;
        let user = req.body.user;

        let result = await investmentService.getInvestmentById(id);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'no investment found'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const updateInvestmentById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let investment = req.body;
        let user = req.body.user;
        let id = req.params.id;

        let result = await investmentService.updateInvestmentById(investment,id);

        if(result?.affected as number>0){
            res.status(200).json({
                status:'successfull',
                data:'investment updated'
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'investment update failed'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}