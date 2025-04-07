import { OTP } from "../entities/otp.entity";
import { generateOtp, verifyOtp } from "../repositories/otp.repository";
import nodemailer from "nodemailer";
import { UserService } from "./user.service";
import { User } from "../entities/user.entity";

const userService = new UserService();
export class OtpService{
    async generateOtp(data:Partial<OTP>){
        try{
            data.otp = await generateOtp(data);

            this.sendOTPwithEmail(data);
        }
        catch(err){
            throw err;
        }
    }

    async sendOTPwithEmail(data:Partial<OTP>){
        try{

            let subject='';
            let body='';
            const transporter = nodemailer.createTransport({
                service: process.env.MAIL_HOST,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            })

            if(data.type==='register'){
                subject = 'Verify your registration'
                            
            }
            else if(data.type==='change-email'){
                subject = 'Verify email change'
            }
            else{
                subject = 'Verify to delete account' 
            }
            body = `Your verification code is: ${data.otp}`

            await transporter.sendMail({
                from:"Financial Dashboard",
                to:data.email,
                subject:subject,
                text:body
            })

        }
        catch(err){
            throw err;
        }
    }

    async checkExistingUser(user:Partial<User>){
        try{
            return await userService.login(user);
        }
        catch(err){
            throw err;
        }
    }

    async verifyOtp(data:Partial<OTP>){
        try{
            return await verifyOtp(data);
        }
        catch(err){
            throw err;
        }
    }

    async registerUser(user:Partial<User>){
        return await userService.register(user);
    }
}