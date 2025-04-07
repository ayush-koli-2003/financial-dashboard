import { IncomeCategory } from "../enums/income.entity";
import { addIncome, deleteIncome, getAllIncomes, getIncomeById, getIncomesByDate, getIncomesByDateWithSearch, getTotalIncomeByDate, groupIncomeByMonths, updateIncomeById } from "../repositories/income.repository";

export class IncomeService{
    async getAllIncomes(user:any){
        try{
            return await getAllIncomes(user);
        }
        catch(err){
            throw err;
            
        }
    }

    async addIncome(income:any,user:any){
        try{
            return await addIncome(income,user);

        }
        catch(err){
            throw err;
            
        }
    }

    async getIncomeCategories(user:any){
        try{
            return Object.values(IncomeCategory);
        }
        catch(err){
            throw err;
            
        }
    }

    async getIncomesByDate(user:any,startDate:any,endDate:any,search?:string){
        try{
            if(search && search.length>0){
                return await getIncomesByDateWithSearch(user,startDate,endDate,search);
            }
            else{
                return await getIncomesByDate(user,startDate,endDate);
            }
        }
        catch(err){
            throw err;
            
        }
    }
    
    async deleteIncome(user:any,id:any){
        try{
            return await deleteIncome(user,id);
        }
        catch(err){
            throw err;
            
        }
    }

    async getIncomeById(id:any){
        try{
            return await getIncomeById(id);
        }
        catch(err){
            throw err;
            
        }
    }

    async updateIncomeById(income:any,id:any){
        try{
            return await updateIncomeById(income,id);
        }
        catch(err){
            throw err;
            
        }
    }

    async getTotalIncomeByDate(user:any,startDate:any,endDate:any){
        try{
            return await getTotalIncomeByDate(user,startDate,endDate);
        }
        catch(err){
            throw err;
            
        }
    }

    async groupIncomeByMonth(user:any,startDate:any,endDate:any){
        try{
            return await groupIncomeByMonths(user,startDate,endDate);
        }
        catch(err){
            throw err;
            
        }
    }
}