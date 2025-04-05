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

export const getBudgetsByDate = async(user:any,startDate:any,endDate:any)=>{
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

export const deleteBudget = async(user:any,id:any)=>{
    try{
        return await budgetRepository.delete({id:id});
    }
    catch(err){
        throw err;
        
    }
}

export const getBudgetCategories=  async(user:any)=>{
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
        return await budgetRepository.findOneBy({id:id});
    }
    catch(err){
        throw err;
        
    }
}

export const updateBudgetById = async(budget:any,id:any)=>{
    try{
        // console.log(expense);
        
        return await budgetRepository.createQueryBuilder('budget').update()
            .set({amount:budget.amount,category:budget.category})
            .where('id = :id',{id}).execute();
    }
    catch(err){
        throw err;
        
    }
}

export const getTotalBudgetByDate = async(user:any,startDate:any,endDate:any)=>{
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