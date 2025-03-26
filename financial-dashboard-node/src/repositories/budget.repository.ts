import { Between, LessThanOrEqual, MoreThan } from "typeorm";
import { AppDataSource } from "../configs/database.config";
import { Budget } from "../entities/budget.entity";

const budgetRepository = AppDataSource.getRepository(Budget);

export const getAllBudgets = async(user:any)=>{
    try{
        return await budgetRepository.find({
            relations:{
                user:true
            },
            where:{
                user:user
            }
        });
    }
    catch(err){
        console.log(err);
        
    }
}

export const createBudget = async (newBudget:any)=> {
    try{
        

        return await budgetRepository.save(newBudget);
    }
    catch(err){
        console.log(err);
        
    }
}

export const getBudgetsByDate = async(user:any,startDate:any,endDate:any)=>{
    try{

        return await budgetRepository.find({
            relations:{
                user:true
            },
            where:{
                date: Between(startDate,endDate),
                user: user
            }
        })
    }
    catch(err){
        console.log(err);
        
    }
}