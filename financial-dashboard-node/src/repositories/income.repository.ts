import { Between, LessThanOrEqual, MoreThan } from "typeorm";
import { AppDataSource } from "../configs/database.config";
import { Income } from "../entities/income.entity";

const incomeRepository = AppDataSource.getRepository(Income);

export const getAllIncomes = async(user:any)=>{
    try{
        return incomeRepository.find({
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

export const addIncome = async(income:any,user:any)=>{
    try{

        let newIncome = new Income(income.amount,income.category,income.date,user,income.note);
        return await incomeRepository.save(newIncome);
    }
    catch(err){
        console.log(err);
        
    }
}

export const getIncomesByDate = async(user:any,startDate:any,endDate:any)=>{
    try{
        return await incomeRepository.find({
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

export const deleteIncome = async(user:any,id:any)=>{
    try{
        return await incomeRepository.delete({id:id});
    }
    catch(err){
        console.log(err);
        
    }
}