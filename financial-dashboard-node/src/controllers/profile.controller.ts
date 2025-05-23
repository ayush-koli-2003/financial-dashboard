import e, { NextFunction, Request, Response } from "express";
import { ProfileService } from "../services/profile.service";
import { ProfileDto } from "../dtos/profile/profile.dto";
import { AppError } from "../types/app-error";
import { UserService } from "../services/user.service";

const profileService = new ProfileService();
const userService = new UserService();

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
        let {user,...body} = req.body;

        // console.log(body.notificationPreference);
        let error = await ProfileDto.validate(body);

        if(!error.isValid){
            throw new AppError('Profile data not valid',500);
        }
        else{
            let profile = new ProfileDto(body);
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
            // console.log('valid');
            
        }
    }
    catch(err){
        next(err);
    }
}

export const deactivateUser = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let {user,...body} = req.body;

        let result = await userService.changeStatus(user,'inactive');

        res.status(200).json({
            status:'successfull',
            data:'user is deactivated'
        })
    }
    catch(err){
        next(err);
    }
}

export const activateUser = async(req:Request,res:Response)=>{
    try{
        let {user,...body} = req.body;

        let result = await userService.changeStatus(user,'active');

        res.status(200).json({
            status:'successfull',
            data:'user is activated'
        })
    }
    catch(err){
        throw err;
    }
}

export const getCurrencyPreference = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;

        let result = await profileService.getCurrencyPreference(user);

        res.status(200).json({
            status:'successfull',
            data:result
        })
    }
    catch(er){
        throw er;
    }
}