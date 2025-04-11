import { MoreThan, LessThanOrEqual, Between } from "typeorm";
import { AppDataSource } from "../configs/database.config";
import { Investment } from "../entities/investment.entity";
import { InvestmentCategory } from "../enums/investment.enum";
import { AppError } from "../types/app-error";
import { User } from "../entities/user.entity";
import { BudgetCategory } from "../enums/budget.enum";

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
        throw err;
        
    }
}

export const getCountOfInvestmentTransactionsThisMonth = async(startDate:any,endDate:any)=>{
    try{
        return await investmentRepository.count({where:{date:Between(startDate,endDate)}})
    }
    catch(err){
        throw err;
    }
}

export const addInvestment =  async(newInvestment:any)=>{
    try{
        return await investmentRepository.save(newInvestment);
    }
    catch(err){
        throw err;
        
    }
}

export const getCategories = async(user:any)=>{
    try{
        return Object.values(InvestmentCategory);
    }
    catch(err){
        throw err;
        
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

export const getInvestmentByDateWithSearch = async(user:any,startDate:any,endDate:any,search:string)=>{
    try{
        return await investmentRepository.createQueryBuilder('investment')
        .leftJoinAndSelect('investment.user','user')
        .where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate})
        .andWhere("(investment.name LIKE :search OR investment.note LIKE :search OR investment.category LIKE :search)",{search:`%${search}%`})
        .orderBy('investment.date','DESC')
        .getMany();
    }
    catch(err){
        throw err;
        
    }
}

export const deleteInvestment = async(user:any,id:any)=>{
    try{
        let result = await investmentRepository.delete({id:id});
        if(result.affected===0){
            throw new AppError('Failed delete investment',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const getInvestmentById = async(id:any)=>{
    try{
        let result = await investmentRepository.findOneBy({id:id});
        if(result===null){
            throw new AppError('Failed get investment by Id',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const updateInvestmentById = async(investment:any,id:any)=>{
    try{
        // console.log(expense);
        
        let result = await investmentRepository.createQueryBuilder('investment').update().set({name:investment.name,amount:investment.amount,category:investment.category,note:investment.note}).where('id = :id',{id}).execute();
        if(result.affected===0){
            throw new AppError('Failed update investment by Id',500);
        }
        else{
            return result;
        }
    }
        
    catch(err){
        throw err;
        
    }
}

export const getTotalInvestmentByDate = async(user:any,startDate:any,endDate:any)=>{
    try{
        return (await investmentRepository.createQueryBuilder('investment')
            .leftJoinAndSelect('investment.user','user')
            .select('SUM(investment.amount)','total')
            .where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate})
            .getRawOne()).total;
    }
    catch(err){
        throw err;
        
    }
}

export const getTotalInvestmentOfCategory = async(user:Partial<User>,startDate:any,endDate:any,category:BudgetCategory)=>{
    try{
        return await investmentRepository.createQueryBuilder('investment')
            .leftJoinAndSelect('investment.user','user')
            .select('SUM(amount)','total')
            .where('user.id= :id AND investment.category = :category AND date BETWEEN :startDate AND :endDate',{id:user.id,category:category,startDate:startDate,endDate:endDate})
            .getRawOne();
    }
    catch(err){
        throw err;
    }
}