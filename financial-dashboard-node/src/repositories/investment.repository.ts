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
        return await investmentRepository.save(newInvestment);
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
            },
            order:{
                date:'DESC'
            }
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const deleteInvestment = async(user:any,id:any)=>{
    try{
        return await investmentRepository.delete({id:id});
    }
    catch(err){
        console.log(err);
        
    }
}

export const getInvestmentById = async(id:any)=>{
    try{
        return await investmentRepository.findOneBy({id:id});
    }
    catch(err){
        console.log(err);
        
    }
}

export const updateInvestmentById = async(investment:any,id:any)=>{
    try{
        // console.log(expense);
        
        return await investmentRepository.createQueryBuilder('investment').update().set({name:investment.name,amount:investment.amount,category:investment.category,note:investment.note}).where('id = :id',{id}).execute();
    }
    catch(err){
        console.log(err);
        
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
        console.log(err);
        
    }
}