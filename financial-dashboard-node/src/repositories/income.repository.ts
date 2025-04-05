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
        throw err;
        
    }
}

export const deleteIncome = async(user:any,id:any)=>{
    try{
        return await incomeRepository.delete({id:id});
    }
    catch(err){
        throw err;
        
    }
}

export const getIncomeById = async(id:any)=>{
    try{
        return await incomeRepository.findOneBy({id:id});
    }
    catch(err){
        throw err;
        
    }
}

export const updateIncomeById = async(income:any,id:any)=>{
    try{
        // console.log(expense);
        
        return await incomeRepository.createQueryBuilder('income').update().set({category:income.category,amount:income.amount,note:income.note}).where('id = :id',{id}).execute();
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