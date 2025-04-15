import { NextFunction, Request, Response } from "express";
import { OtpService } from "../services/otp.service";
import { AppError } from "../types/app-error";
import { OtpDto } from "../dtos/otp/otp.dto";

const otpService = new OtpService();
export const generateOtp = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,type} = req.body;
        console.log(email,type);
        
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
            else if(type==='forgot-password'){
                let result = await otpService.checkExistingUser({email:body.email});
                if(result===null){
                    throw new AppError('No User Found!',500);
                }
            }

            let createdAt = new Date();
    
            let result = await otpService.generateOtp({email:body.email,type:body.type,createdAt:createdAt});
    
            res.status(200).json({
                status:'successfull',
                data:'otp is generated'
            })
        }
    }
    catch(err){
        next(err);
    }
}