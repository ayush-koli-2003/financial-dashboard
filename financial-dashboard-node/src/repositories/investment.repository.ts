import { MoreThan, LessThanOrEqual, Between } from "typeorm";
import { AppDataSource } from "../configs/database.config";
import { Investment } from "../entities/investment.entity";
import { InvestmentCategory } from "../enums/investment.enum";

const investmentRepository = AppDataSource.getRepository(Investment);

export const getAllInvestments = async (user:any)=>{
    try{
        return await investmentRepository.find({
            relations:{
                user:true
            },
            where:{
                user:user
            }
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const addInvestment =  async(newInvestment:any)=>{
    try{
        investmentRepository.save(newInvestment);
    }
    catch(err){
        console.log(err);
        
    }
}

export const getCategories = async(user:any)=>{
    try{
        return Object.values(InvestmentCategory);
    }
    catch(err){
        console.log(err);
        
    }
}

export const getInvestmentByDate = async(user:any,startDate:any,endDate:any)=>{
    try{
        return await investmentRepository.find({
            relations:{
                user:true
            },
            where:{
                date: Between(startDate,endDate), 
                user:user
            }
        })
    }
    catch(err){
        console.log(err);
        
    }
}