import { Investment } from "../entities/investment.entity";
import { addInvestment, getAllInvestments, getCategories, getInvestmentByDate } from "../repositories/investment.repository";

export class InvestmentService{
    async getInvestments(user:any){
        return await getAllInvestments(user);
    }

    async addInvestment(investment:any,user:any){
        try{
            let newInvestment = new Investment(investment.name,investment.category,investment.amount,investment.date,user,investment.note,investment.return);
            return await addInvestment(newInvestment);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getInvestmentCategories(user:any){
        try{
            return await getCategories(user);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getInvestmentsByDate(user:any,startDate:any,endDate:any){
        try{
            return await getInvestmentByDate(user,startDate,endDate);
        }
        catch(err){
            console.log(err);
            
        }
    }
}