import { Investment } from "../entities/investment.entity";
import { addInvestment, deleteInvestment, getAllInvestments, getCategories, getInvestmentByDate, getInvestmentByDateWithSearch, getInvestmentById, getTotalInvestmentByDate, updateInvestmentById } from "../repositories/investment.repository";
import { AppError } from "../types/app-error";
import { BudgetService } from "./budget.service";

export class InvestmentService{
    async getInvestments(user:any){
        return await getAllInvestments(user);
    }

    async addInvestment(investment:any,user:any,startDate:string,endDate:string){
        try{
            const budgetService = new BudgetService();
            let budget= await budgetService.findBudgetByCategory(user,startDate,endDate,investment.category);
            let newInvestment
            
            if(!budget){
                newInvestment = new Investment(investment.name,investment.category,investment.amount,investment.date,user,investment.note);
                await addInvestment(newInvestment);
                throw new AppError('Budget does not exist!',404);
            }

            newInvestment = new Investment(investment.name,investment.category,investment.amount,investment.date,user,investment.note,investment.return,budget);
            
            return await addInvestment(newInvestment);
        }
        catch(err){
            throw err;
            
        }
    }

    async getInvestmentCategories(user:any){
        try{
            return await getCategories(user);
        }
        catch(err){
            throw err;
            
        }
    }

    async getInvestmentsByDate(user:any,startDate:any,endDate:any,search?:string){
        try{
            if(search && search.length>0){
                return await getInvestmentByDateWithSearch(user,startDate,endDate,search);
            }
            
            return await getInvestmentByDate(user,startDate,endDate);
        }
        catch(err){
            throw err;
            
        }
    }

    async deleteInvestment(user:any,id:any){
        try{
            return await deleteInvestment(user,id);
        }
        catch(err){
            throw err;
            
        }
    }

    async getInvestmentById(id:any){
        try{
            return await getInvestmentById(id);
        }
        catch(err){
            throw err;
            
        }
    }

    async updateInvestmentById(investment:any,id:any,user:any,startDate:any,endDate:any){
        try{
            const budgetService = new BudgetService();
            let budget= await budgetService.findBudgetByCategory(user,startDate,endDate,investment.category);

            if(!budget){
                await updateInvestmentById(investment,id);
                throw new AppError('Budget does not exist!',404);
            }

            return await updateInvestmentById(investment,id);
        }
        catch(err){
            throw err;
            
        }
    }

    async getTotalInvestmentByDate(user:any,startDate:any,endDate:any){
        try{
            return await getTotalInvestmentByDate(user,startDate,endDate);
        }
        catch(err){
            throw err;
            
        }
    }
}