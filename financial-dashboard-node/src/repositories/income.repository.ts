import { Between, LessThanOrEqual, MoreThan } from "typeorm";
import { AppDataSource } from "../configs/database.config";
import { Income } from "../entities/income.entity";
import { AppError } from "../types/app-error";

const incomeRepository = AppDataSource.getRepository(Income);

export const getAllIncomes = async(user:any)=>{
    try{
        return incomeRepository.find({
            relations:{
                user:true
            },
            where:{
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

export const addIncome = async(income:any,user:any)=>{
    try{

        let newIncome = new Income(income.amount,income.category,income.date,user,income.note);
        return await incomeRepository.save(newIncome);
    }
    catch(err){
        throw err;
        
    }
}

export const getCountOfIncomeTransactionsThisMonth = async(startDate:any,endDate:any)=>{
    try{
        return await incomeRepository.count({where:{date:Between(startDate,endDate)}})
    }
    catch(err){
        throw err;
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

export const getIncomesByDateWithSearch = async(user:any,startDate:any,endDate:any,search:string)=>{
    try{
        return await incomeRepository.createQueryBuilder('income')
        .leftJoinAndSelect('income.user','user')
        .where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate})
        .andWhere("(income.note LIKE :search OR income.category LIKE :search)",{search:`%${search}%`})
        .orderBy('income.date','DESC')
        .getMany();
    }
    catch(err){
        throw err;
        
    }
}

export const deleteIncome = async(user:any,id:any)=>{
    try{
        let result = await incomeRepository.delete({id:id});
        if(result.affected===0){
            throw new AppError('Failed delete income by Id',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const getIncomeById = async(id:any)=>{
    try{
        let result = await incomeRepository.findOneBy({id:id});
        if(result===null){
            throw new AppError('Failed get income by Id',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const updateIncomeById = async(income:any,id:any)=>{
    try{
        // console.log(expense);
        
        let result = await incomeRepository.createQueryBuilder('income').update().set({category:income.category,amount:income.amount,note:income.note}).where('id = :id',{id}).execute();
        if(result.affected===0){
            throw new AppError('Failed update income by Id',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const getTotalIncomeByDate = async(user:any,startDate:any,endDate:any)=>{
    try{
        return (await incomeRepository.createQueryBuilder('income').leftJoinAndSelect('income.user','user').select('SUM(income.amount)','total').where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate}).getRawOne()).total;
    }
    catch(err){
        throw err;
        
    }
}

export const groupIncomeByMonths = async(user:any,startDate:any,endDate:any)=>{
    try{
        return await incomeRepository.createQueryBuilder('income')
            .leftJoinAndSelect('income.user','user')
            .select('MONTH(date)','month')
            .addSelect('SUM(amount)','income')
            .where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate})
            .groupBy('MONTH(date)')
            .orderBy('MONTH(date)')
            .getRawMany();
    }
    catch(err){
        throw err;
        
    }
}