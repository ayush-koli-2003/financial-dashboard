import { Budget } from "../entities/budget.entity";
import { BudgetCategory } from "../enums/budget.enum";
import { ExpenseCategory } from "../enums/expense.enum";
import { InvestmentCategory } from "../enums/investment.enum";
import { createBudget, deleteBudget, getAllBudgets, getBudgetById, getBudgetCategories, getBudgetsByDate, getTotalBudgetByDate, updateBudgetById } from "../repositories/budget.repository";
import { ExpenseService } from "./expenses.service";
import { InvestmentService } from "./investment.service";

const expenseService = new ExpenseService();
const investmentService = new InvestmentService();
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

    async getAllCategories(){
        try{
            return Object.values(BudgetCategory);
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

    async getTotalSpendingOfCategory(user:any,startDate:any,endDate:any){
        try{
            let expenses = await expenseService.getExpenseByDate(user,startDate,endDate);
            let investments = await investmentService.getInvestmentsByDate(user,startDate,endDate);

            let expenseCategories = Object.values(ExpenseCategory);
            let investmentCategories = Object.values(InvestmentCategory);

            let totalSpendingByCategory:any[]=[]
            expenseCategories.forEach( 
                (cat)=>{
                    let expenseOfCategory = expenses?.filter(e=> e.category === cat);
                    let totalExpense = expenseOfCategory?.reduce((total,e)=> total+e.amount,0);

                    totalSpendingByCategory.push({category:cat,totalSpending:totalExpense});
                }
            )

            investmentCategories.forEach(
                (cat)=>{
                    let investmentsOfcategory = investments?.filter(i=> i.category===cat);
                    let totalInvestment = investmentsOfcategory?.reduce((total,i)=>total+i.amount,0);

                    totalSpendingByCategory.push({category:cat,totalSpending:totalInvestment});
                }
            )
            return totalSpendingByCategory;
        }
        catch(err){
            console.log(err);
            
        }
    }

    async deleteBudget(user:any,id:any){
        try{
            return await deleteBudget(user,id);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getBudgetCategories(user:any){
        try{
            return await getBudgetCategories(user);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getBudgetById(id:any){
        try{
            return await getBudgetById(id);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async updateBudgetById(budget:any,id:any){
        try{
            return await updateBudgetById(budget,id);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getTotalBudgetByDate(user:any,startDate:any,endDate:any){
        try{
            return await getTotalBudgetByDate(user,startDate,endDate);
        }
        catch(err){
            console.log(err);
            
        }
    }
}