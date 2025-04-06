import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from "../types/app-error";

const userService = new UserService();

const SALT_ROUNDS = 10;

export const login = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let body = req.body;
        
        let {username,email} = body;
        let pass = body.password;

        // console.log(body);
        
        
        let result = await userService.login({username,email});

        // console.log(result[0]);
        let isCorrect = false;
        let token='';

        if(result){
            let {password,...validatedUser} = result;

            isCorrect = await bcrypt.compare(pass,password);
            
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
    catch(err){
        next(err); 
    }
}

export const register = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body;
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

        let user = await userService.login({email});

        let isCorrect = false;
        let token='';

        if(user){
            let {password,...validatedUser} = user;

            isCorrect = await bcrypt.compare(currPassword,password);
            
            if(isCorrect){
                console.log(validatedUser);
                
                let hasedPassword = await bcrypt.hash(newPassword,SALT_ROUNDS);
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
    catch(err){
        next(err);
        
    }
}