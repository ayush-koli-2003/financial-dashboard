import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userService = new UserService();

export const login = async(req:Request,res:Response)=>{
    try{
        let body = req.body;
        
        let {username,email} = body;
        let pass = body.password;

        // console.log(body);
        
        
        let result:any = await userService.login({username,email});

        // console.log(result[0]);
        let isCorrect = false;
        let token='';

        if(result.length>0){
            let {password,...validatedUser} = result[0];

            isCorrect = await bcrypt.compare(pass,password);
            
            if(isCorrect){
                token = jwt.sign(validatedUser,process.env.SECRET_KEY as string,{expiresIn:'2h'});
                // console.log(token);
                
                res.cookie('user',token,{httpOnly:true,maxAge:(2*60*60*1000),secure:true});
            }
        }

        res.status(200).json({
            status:result.length > 0 && isCorrect ? 'successfull':'failed',
            data:result.length > 0 && isCorrect ? token : 'user does not exist'
        });
    }
    catch(err){
        console.log(err); 
    }
}

export const register = async(req:Request,res:Response)=>{
    try{
        let user = req.body;
        user.password = await bcrypt.hash(user.password,10);
        let result = await userService.register(user); 

        // console.log(result);
        

        res.status(200).json({
            status:result !== null ? 'successfull':'failed',
            data:result !== null ? result : 'user already exist'
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const logout = async(req:Request,res:Response)=>{
    try{

        res.cookie('user',null,{maxAge:0});

        res.status(200).json({
            status:'successfull',
            data:'user is logged out'
        })
    }
    catch(err){
        console.log(err);
        
    }
}