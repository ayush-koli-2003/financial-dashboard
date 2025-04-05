import { Between, LessThan, LessThanOrEqual, MoreThan } from "typeorm";
import { AppDataSource } from "../configs/database.config";
import { Expense } from "../entities/expense.entity";
import { AppError } from "../types/app-error";

const expenseRepository = AppDataSource.getRepository(Expense);

export const getExpenses = async(user:any)=>{
    try{
        return await expenseRepository.find({
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

export const addExpense = async(newExpense:any)=>{
    try{
        return await expenseRepository.save(newExpense);
    }
    catch(err){
        throw err;
        
    }
}

export const deleteExpense = async(user:any,id:any)=>{
    try{

        let result = await expenseRepository.delete({id:id});

        if(result.affected===0){
            throw new AppError('Failed delete expense',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const getExpenseByDate = async(user:any,startDate:any,endDate:any)=>{
    try{
        return await expenseRepository.find({
            where:{
                date: Between(startDate,endDate),
                user : user
            },
            order: {
                date:'DESC'
            }
        })

        // createQueryBuilder('expense')
        //     .where('expense.date >= :startDate',{startDate:startDate})
        //     .andWhere('expense.date < :endDate',{endDate})
        //     .andWhere('expense.user = :user',{user})
        //     .getMany();
    }
    catch(err){
        throw err;
        
    }
}

export const getExpenseById = async(id:any)=>{
    try{
        let result = await expenseRepository.findOneBy({id:id});

        if(result===null){
            throw new AppError('Failed get expense by Id',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const updateExpenseById = async(expense:any,id:any)=>{
    try{
        // console.log(expense);
        
        let result= await expenseRepository.createQueryBuilder('expense').update().set({name:expense.name,amount:expense.amount,category:expense.category,note:expense.note}).where('id = :id',{id}).execute();
        if(result.affected===0){
            throw new AppError('Failed update expense by Id',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const getTotalExpenseByDate = async(user:any,startDate:any,endDate:any)=>{
    try{
        return (await expenseRepository.createQueryBuilder('expense').leftJoinAndSelect('expense.user','user').select('SUM(expense.amount)','total').where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate}).getRawOne()).total;
    }
    catch(err){
        throw err;
        
    }
}

export const groupExpenseByMonth = async(user:any,startDate:any,endDate:any)=>{
    try{
        return await expenseRepository.createQueryBuilder('expense')
        .leftJoinAndSelect('expense.user','user')
        .select('MONTH(date)','month')
        .addSelect('SUM(amount)','expense')
        .where('user.id = :id AND date BETWEEN :startDate AND :endDate',{id:user.id,startDate:startDate,endDate:endDate})
        .groupBy('MONTH(date)')
        .orderBy('MONTH(date)')
        .getRawMany();
    }
    catch(err){
        throw err;
        
    }
}