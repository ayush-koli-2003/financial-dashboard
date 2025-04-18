import { NextFunction, Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { UserService } from "../services/user.service";
import { AppError } from "../types/app-error";

const adminService = new AdminService();
const userService = new UserService();
export const getAdminDashboardData = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        let result = await adminService.getAdminDashboardData(startDate,endDate);

        res.status(200).json({
            status:'successfull',
            data:result
        })
    }
    catch(err){
        next(err);
    }
}

export const getAllUsers = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let user = req.body.user;
        let {startDate,endDate,...body} = req.body;
        let result = await adminService.getAllUsers();

        res.status(200).json({
            status:'successfull',
            data:result
        })
    }
    catch(err){
        next(err);
    }
}

export const changeStatus = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let userId = parseInt(req.params.id);
        
        if(isNaN(userId)){
            throw new AppError('ID should be a number',500);
        }
        else{
            
            let user = await userService.getUser({id:userId});

            if(user){
                if(user.status==='active'){
                    let result = await userService.changeStatus(user,'inactive');
                }
                else{
                    let result = await userService.changeStatus(user,'active');
                }

                res.status(200).json({
                    status:'successfull',
                    data:'status changed'
                })
            }
        }
    }
    catch(err){
        next(err);
    }
}