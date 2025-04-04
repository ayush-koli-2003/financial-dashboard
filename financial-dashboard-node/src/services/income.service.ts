import { IncomeCategory } from "../enums/income.entity";
import { addIncome, deleteIncome, getAllIncomes, getIncomeById, getIncomesByDate, getTotalIncomeByDate, groupIncomeByMonths, updateIncomeById } from "../repositories/income.repository";

export class IncomeService{
    async getAllIncomes(user:any){
        try{
            return await getAllIncomes(user);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async addIncome(income:any,user:any){
        try{
            return await addIncome(income,user);

        }
        catch(err){
            console.log(err);
            
        }
    }

    async getIncomeCategories(user:any){
        try{
            return Object.values(IncomeCategory);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getIncomesByDate(user:any,startDate:any,endDate:any){
        try{
            return await getIncomesByDate(user,startDate,endDate);
        }
        catch(err){
            console.log(err);
            
        }
    }
    
    async deleteIncome(user:any,id:any){
        try{
            return await deleteIncome(user,id);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getIncomeById(id:any){
        try{
            return await getIncomeById(id);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async updateIncomeById(income:any,id:any){
        try{
            return await updateIncomeById(income,id);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getTotalIncomeByDate(user:any,startDate:any,endDate:any){
        try{
            return await getTotalIncomeByDate(user,startDate,endDate);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async groupIncomeByMonth(user:any,startDate:any,endDate:any){
        try{
            return await groupIncomeByMonths(user,startDate,endDate);
        }
        catch(err){
            console.log(err);
            
        }
    }
}