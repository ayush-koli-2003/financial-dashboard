import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from "../types/app-error";
import { RegisterDto } from "../dtos/user/register.dto";
import { LoginDto } from "../dtos/user/login.dto";
import { ChangePasswordDto } from "../dtos/user/change-password.dto";

const userService = new UserService();

const SALT_ROUNDS = 10;

export const login = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let body = req.body;

        let {isValid} = await LoginDto.validate(body);

        if(!isValid){
            throw new AppError('Login data not valid',500);
        }
        else{
            let user = new LoginDto(body);
    
            // console.log(body);
            
            
            let result = await userService.login({email:user.email});
    
            // console.log(result[0]);
            let isCorrect = false;
            let token='';
    
            if(result){
                let {password,...validatedUser} = result;
    
                isCorrect = await bcrypt.compare(user.password,password);
                
                if(isCorrect){
                    token = jwt.sign(validatedUser,process.env.SECRET_KEY as string,{expiresIn:'1d'});
                    // console.log(token);
                    
                    res.cookie('user',token,{httpOnly:true,maxAge:(1*24*60*60*1000),secure:true});
    
                    res.status(200).json({
                        status: 'successfull',
                        data:token
                    });
                }
                else{
    
                    throw new AppError('password incorrect',500)
                }
            }
            else{
                throw new AppError('user does not exist',500)
            }
        }
        
        
    }
    catch(err){
        next(err); 
    }
}

export const register = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let body = req.body;
        let {isValid} = await RegisterDto.validate(body);
        if(!isValid){
            throw new AppError('User data not valid',500);
        }else{
            let user = new RegisterDto(body);
            user.password = await bcrypt.hash(user.password,SALT_ROUNDS);
            let result = await userService.register(user);

            console.log(result);

            if(result){
                res.status(200).json({
                    status:'successfull',
                    data:'user created'
                })
            }
            else{
                throw new AppError('user already exist',500);
            }
        }
    }
    catch(err){
        next(err);
        
    }
}

export const logout = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        res.cookie('user',null,{maxAge:0});

        res.status(200).json({
            status:'successfull',
            data:'user is logged out'
        })
    }
    catch(err){
        next(err);
        
    }
}

export const changePassword = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log('got change password request');
        
        let {email,currPassword,newPassword} = req.body;

        let error = await ChangePasswordDto.validate({email,currPassword,newPassword});
        if(!error.isValid){
            throw new AppError('Change password data not valid',500);

        }
        else{
            let changePassword = new ChangePasswordDto({email:email,currPassword:currPassword,newPassword:newPassword});
            let user = await userService.login({email:changePassword.email});

            let isCorrect = false;
            let token='';
    
            if(user){
                let {password,...validatedUser} = user;
    
                isCorrect = await bcrypt.compare(changePassword.currPassword,password);
                
                if(isCorrect){
                    console.log(validatedUser);
                    
                    let hasedPassword = await bcrypt.hash(changePassword.newPassword,SALT_ROUNDS);
                    let passwordChange = await userService.changePassword(validatedUser,hasedPassword);
    
                    // console.log(passwordChange);
                    
                    if(passwordChange?.affected as number>0){
                        res.status(200).json({
                            status: 'successfull',
                            data:token
                        });
                    }
                    else{
                        throw new AppError('Failed password change',500);
                    }
                }
                else{
                    throw new AppError('Password incorrect',500);
                }
            }
            else{
                throw new AppError('Failed user does not exist',500);
            }
        }

        
    }
    catch(err){
        next(err);
        
    }
}