import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/app-error";
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction)=>{
    console.log(err.message);
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            status:'failed',
            message:err.message
        })
    }
    else{
        res.status(500).json({
            status:'error',
            message:'Something went wrong'
        })
    }
}