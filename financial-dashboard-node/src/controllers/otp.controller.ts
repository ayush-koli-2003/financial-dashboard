import { NextFunction, Request, Response } from "express";
import { OtpService } from "../services/otp.service";
import { AppError } from "../types/app-error";

const otpService = new OtpService();
export const generateOtp = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,type} = req.body;

        

        if(type==='register'){
            let result = await otpService.checkExistingUser({email:email});
            if(result){
                throw new AppError('User already exists',500);
            }
        }

        let result = await otpService.generateOtp({email:email,type:type});

        res.status(200).json({
            status:'successfull',
            data:'otp is generated'
        })
    }
    catch(err){
        next(err);
    }
}