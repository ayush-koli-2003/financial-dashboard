import { NextFunction, Request, Response } from "express";

export const parseDate = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let month:any = req.query.month;
        let year:any = req.query.year;

        if(month===undefined){
            month = new Date().toISOString().split("T")[0].split('-')[1];
        }
        
        if(year === undefined || year.length==0){
            year = new Date().toISOString().split("T")[0].split('-')[0];
            
        }
        let startDate = new Date(year,month-1,1).toISOString().split('T')[0];
        let endDate = new Date(year,month,1).toISOString().split('T')[0];

        req.body.startDate = startDate;
        req.body.endDate = endDate;
        // console.log(startDate,endDate);
        
        next();
    }
    catch(err){
        console.log(err);
        
    }
}