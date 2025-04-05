import { DashboardService } from "../services/dashboard.service"
import { NextFunction, Request,Response } from "express";

const dashboardService = new DashboardService();

export const getDashboardData = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let result = await dashboardService.getDashboardData(user,startDate,endDate);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getDashboardTransactions = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let result = await dashboardService.getTransactionsByDate(user,startDate,endDate);

        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
    }
    catch(err){
        next(err);
        
    }
}
