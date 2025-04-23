import { NextFunction, Request, Response } from "express";
import { IncomeService } from "../services/income.service";
import { AddIncomeDto } from "../dtos/income/add-income.dto";
import { AppError } from "../types/app-error";
import { UpdateIncomeDto } from "../dtos/income/update-income.dto";

const incomeService = new IncomeService();

export const getAllIncomes = async(req:Request,res:Response,next:NextFunction)=>{
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
        next(err);
        
    }
}

export const getTotalIncomeRecords= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let search:string = req.query.search as string;
        let filterBy:string = req.query.filterBy === 'undefined' || undefined? '': req.query.filterBy as string;
        // console.log(search);
        
        let result = (await incomeService.getIncomesByDate(user,startDate,endDate,filterBy,search)).length;
        
        res.status(200).json({
            status:200,
            data:result
        })
    }
    catch(err){
        next(err);
    }
}

export const addIncome = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        console.log(body);

        let error = await AddIncomeDto.validate(body);

        if(error.isValid){
            let income = new AddIncomeDto(body);
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
            // console.log("valid");
            
        }
        else{
            throw new AppError('Add income data invalid',500);
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getIncomeCategories = async(req:Request,res:Response,next:NextFunction)=>{
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
        next(err);
        
    }
}

export const getIncomesByDate = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let search = req.query.search as string;
        let limit:number = parseInt(req.query.limit as string) || 6;
        let offset:number = parseInt(req.query.offset as string) || 0;
        let filterBy:string = req.query.filterBy === 'undefined' || undefined? '': req.query.filterBy as string;
        let sortBy:'ASC'|'DESC'|undefined = req.query.sortBy as ('ASC'|'DESC'|undefined);
        if(sortBy==='undefined' as unknown as undefined){
            sortBy = undefined
        }

        let results = await incomeService.getIncomesByDate(user,startDate,endDate,search);

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
        next(err);
        
    }
}

export const deleteIncome = async(req:Request,res:Response,next:NextFunction)=>{
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
        next(err);
        
    }
}

export const getIncomeById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let id = req.params.id;
        let user = req.body.user;

        let result = await incomeService.getIncomeById(id);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'no income found'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const updateIncomeById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        // body.amount = Number(body.amount);
        let id = parseInt(req.params.id);

        if(!isNaN(id)){
            body.id = id;
            let error = await UpdateIncomeDto.validate(body);

            if(!error.isValid){
                throw new AppError('Update income data not valid',500);
            }
            else{
                let income = new UpdateIncomeDto(body);
                let result = await incomeService.updateIncomeById(income,id);

                if(result?.affected as number>0){
                    res.status(200).json({
                        status:'successfull',
                        data:'income updated'
                    })
                }
                else{
                    res.status(400).json({
                        status:'failed',
                        data:'income update failed'
                    })
                }
                console.log('valid');
                
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