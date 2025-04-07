import { AppDataSource } from "../configs/database.config";
import { OTP } from "../entities/otp.entity";
import { AppError } from "../types/app-error";

const otpRepository = AppDataSource.getRepository(OTP);

export const generateOtp = async(data:Partial<OTP>)=>{
    try{
        const otp = Math.floor(100000+Math.random()*900000).toString();
        let date = new Date();
        let result = await otpRepository.save({
            email:data.email,
            otp:otp,
            createdAt:date,
            type:data.type,
        })

        return otp;
    }
    catch(err){
        throw err;
    }
}

export const verifyOtp = async(data:Partial<OTP>)=>{
    try{
        let result = await otpRepository.findOneBy({email:data.email,otp:data.otp,type:data.type});
        if(result===null){
            throw new AppError('Wrong OTP',500);
        }
        else{
            await otpRepository.delete({email:data.email})
            return result;
        }
    }
    catch(err){
        throw err;
    }
}