import { Budget } from "../entities/budget.entity";
import { BudgetCategory } from "../enums/budget.enum";
import { createBudget, getAllBudgets, getBudgetsByDate } from "../repositories/budget.repository";

export class BudgetService{
    async getAllBudgets(user:any){
        try{
            return await getAllBudgets(user);
        }
        catch(err){
            console.log(err);
        }
    }
    async createBudget(budget:any,user:any){
        try{
            let newBudget = new Budget(budget.category,budget.amount,budget.date,user);
            return await createBudget(newBudget);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getFilteredCategories(user:any){
        try{
            let budgetList = await this.getAllBudgets(user) as Budget[];
            let enumCategories = Object.values(BudgetCategory);

            return enumCategories.filter(cat=> budgetList.find(b => b.category === cat) === undefined);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getBudgetByDate(user:any,startDate:any,endDate:any){
        try{
            // IMP - parsing logic
            // if(year === undefined){
            //     year = new Date().toISOString().split("T")[0].split('-')[0];
                
            // }
            // let startDate = new Date(year,month-1,1).toISOString().split('T')[0];
            // let endDate = new Date(year,month,1).toISOString().split('T')[0];

            // console.log(startDate,endDate);
            

            return await getBudgetsByDate(user,startDate,endDate); 
        }
        catch(err){
            console.log(err);
            
        }
    }
}