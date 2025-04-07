import { NextFunction, Request, Response } from "express";
import { OtpService } from "../services/otp.service";

const otpService = new OtpService();
export const verifyOtp = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const{user,otp,type} = req.body;

        console.log(user,otp,type);
        

        let result = await otpService.verifyOtp({email:user.email,otp:otp,type:type});

        if(result){
            console.log('correct otp');
            
            req.body = user;
            next();
        }

    }
    catch(err){
        next(err);
    }
}