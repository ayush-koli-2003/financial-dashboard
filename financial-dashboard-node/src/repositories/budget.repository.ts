import { Between, LessThanOrEqual, MoreThan } from "typeorm";
import { AppDataSource } from "../configs/database.config";
import { Budget } from "../entities/budget.entity";
import { AppError } from "../types/app-error";
import { BudgetCategory } from "../enums/budget.enum";
import { User } from "../entities/user.entity";

const budgetRepository = AppDataSource.getRepository(Budget);

export const getAllBudgets = async(user:Partial<User>)=>{
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
        throw err;
        
    }
}

export const createBudget = async (newBudget:any)=> {
    try{
        

        return await budgetRepository.save(newBudget);
    }
    catch(err){
        throw err;
        
    }
}

export const getBudgetsByDate = async(user:Partial<User>,startDate:any,endDate:any)=>{
    try{

        return await budgetRepository.find({
            relations:{
                user:true
            },
            where:{
                date: Between(startDate,endDate),
                user: user
            },
            order:{
                date:'DESC'
            }
        })
    }
    catch(err){
        throw err;
        
    }
}

export const deleteBudget = async(user:Partial<User>,id:any)=>{
    try{
        let result = await budgetRepository.delete({id:id});

        if(result.affected===0){
            throw new AppError('Failed delete budget',500);
        }
        else{
            result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const getBudgetCategories=  async(user:Partial<User>)=>{
    try{
        return await budgetRepository.createQueryBuilder('budget')
            .leftJoinAndSelect('budget.user','user')
            .select("budget.category")
            .where("budget.userId = :id",{id: user.id})
            .getMany();
    }
    catch(err){
        throw err;
        
    }
}

export const getBudgetById = async(id:any)=>{
    try{
        let result = await budgetRepository.findOneBy({id:id});
        if(result===null){
            throw new AppError('Failed get budget by Id',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const updateBudgetById = async(budget:Partial<Budget>,id:any)=>{
    try{
        // console.log(expense);
        
        let result = await budgetRepository.createQueryBuilder('budget').update()
            .set({amount:budget.amount})
            .where('id = :id',{id}).execute();
        
        if(result.affected===0){
            throw new AppError('Update budget failed',500);
        }
    }
    catch(err){
        throw err;
        
    }
}

export const getTotalBudgetByDate = async(user:Partial<User>,startDate:any,endDate:any)=>{
    try{
        return (await budgetRepository.createQueryBuilder('budget')
            .leftJoinAndSelect('budget.user','user')
            .select('SUM(budget.amount)','total')
            .where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate})
            .getRawOne()).total;
    }
    catch(err){
        throw err;
        
    }
}

export const findBudgetByCategory= async(user:any,startDate:any,endDate:any,category:BudgetCategory)=>{
    try{
        return await budgetRepository.createQueryBuilder('budget')
            .leftJoinAndSelect('budget.user','user')
            .where('user.id = :id AND date BETWEEN :startDate AND :endDate AND category = :category',{id:user.id,startDate:startDate,endDate:endDate,category:category})
            .getOne();
    }
    catch(err){
        throw err;
    }
}