import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserService } from "../services/user.service";

// Set cookie on backend
// Set expire for cookies and jwt

const userService = new UserService();
export const verifyToken = async(req:Request,res:Response,next:NextFunction)=>{ 
    try{
        
        let token = req.cookies.user === undefined? req.headers.authorization : req.cookies.user;

        // console.log(token);
        
        
        if(token!==undefined){
            let userPayload:any;
            jwt.verify(token,process.env.SECRET_KEY as string,(err:any,decoded:any)=>{
                if(err){
                    res.json({
                        status:'failed',
                        data:'token expired'
                    })
                }else{
                    userPayload = decoded
                }
            });
            
            let {username,email} = userPayload as JwtPayload;
            let userBody = await userService.getUser({username,email});
            req.body.user = userBody;
            next();
        }
        else{
            res.json({
                status:'failed',
                data:'token not found'
            })
        }

    }
    catch(err){
        console.log(err);
        
    }
}