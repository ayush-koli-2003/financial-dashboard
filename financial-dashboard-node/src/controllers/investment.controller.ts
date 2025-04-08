import { NextFunction, Request, Response } from "express";
import { InvestmentService } from "../services/investment.service";
import { AddInvestmentDto } from "../dtos/investment/add-investment.dto";
import { AppError } from "../types/app-error";
import { UpdateInvestmentDto } from "../dtos/investment/update-investment.dto";

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
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        console.log(body);

        let error = await AddInvestmentDto.validate(body);

        if(error.isValid){
            let investment = new AddInvestmentDto(body);
            let result = await investmentService.addInvestment(investment,user,startDate,endDate);

            res.status(200).json({
                status:'successfull',
                data: result
            })
            
        }
        else{
            throw new AppError('Add investment data invalid',500);
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
        let search = req.query.search as string;

        let result = await investmentService.getInvestmentsByDate(user,startDate,endDate,search);
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
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        // body.amount = Number(body.amount);
        let id = parseInt(req.params.id);

        if(!isNaN(id)){

            let error = await UpdateInvestmentDto.validate(body);

            if(!error.isValid){
                throw new AppError('Update investment data invalid',500)
            }
            else{
                let investment = new UpdateInvestmentDto(body);
                let result = await investmentService.updateInvestmentById(investment,id,user,startDate,endDate);

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
                console.log('valid');
                
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