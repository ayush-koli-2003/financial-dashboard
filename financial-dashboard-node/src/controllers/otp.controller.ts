import { NextFunction, Request, Response } from "express";
import { OtpService } from "../services/otp.service";
import { AppError } from "../types/app-error";
import { OtpDto } from "../dtos/otp/otp.dto";

const otpService = new OtpService();
export const generateOtp = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,type} = req.body;
        let error = await OtpDto.validate({email:email,type:type})

        if(!error.isValid){
            throw new AppError('Otp data not valid',500);
        }
        else{
            let body = new OtpDto({email,type});
            if(type==='register'){
                let result = await otpService.checkExistingUser({email:body.email});
                if(result){
                    throw new AppError('User already exists',500);
                }
            }
    
            let result = await otpService.generateOtp({email:body.email,type:body.type});
    
            res.status(200).json({
                status:'successfull',
                data:'otp is generated'
            })

            console.log('valid');
            

        }
    }
    catch(err){
        next(err);
    }
}