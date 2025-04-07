import { NextFunction, Request, Response } from "express";
import { ProfileService } from "../services/profile.service";

const profileService = new ProfileService();

export const getProfile = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;

        let result = await  profileService.getProfile(user);
        
        
        if(result){
            res.status(200).json({
                status:'successfull',
                data:result
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                data:'no profile found'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const getCurrencyCategories = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let result = await profileService.getCurrencyCategories();

        if(result){
            res.status(200).json({
                status:"successfull",
                data:result
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data:'no category found'
            })
        }
    }
    catch(err){
        next(err);
        
    }
}

export const updateProfile = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let {user,...profile} = req.body;

        // console.log(user,profile);
        
        
        let result = await profileService.updateProfile(user,profile);

        if(result){
            res.status(200).json({
                status:"successfull",
                data:result
            })
        }
        else{
            res.status(400).json({
                status:"failed",
                data:'update failed'
            })
        }
    }
    catch(err){
        next(err);
    }
}