import { Request, Response } from "express";

export const globalErrorHandler = async(err:any,req:Request,res:Response)=>{
    console.log('Error occured');
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            status:'failed',
            message:err.message
        })
    }
    else{

    }
}