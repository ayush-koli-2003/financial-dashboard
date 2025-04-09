import { NextFunction, Request, Response } from "express";
import { AppError } from "../types/app-error";

export const verifyAdminRole = async(req:Request,res:Response,next:NextFunction)=>{ 
    try{
        let user = req.body.user;

        if(user.role && user.role.toLowerCase() ==='admin'){
            // console.log('is admin');
            
            next();
        }
        else{
            throw new AppError('You are not authorized!',500);
        }
        

    }
    catch(err){
        next(err);
        
    }
}