import { Budget } from "../entities/budget.entity";
import { BudgetCategory } from "../enums/budget.enum";
import { ExpenseCategory } from "../enums/expense.enum";
import { InvestmentCategory } from "../enums/investment.enum";
import { createBudget, deleteBudget, getAllBudgets, getBudgetById, getBudgetCategories, getBudgetsByDate, getTotalBudgetByDate, updateBudgetById } from "../repositories/budget.repository";
import { AppError } from "../types/app-error";
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
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to get budgets", 500);
        }
    }
    async createBudget(budget:any,user:any){
        try{
            let newBudget = new Budget(budget.category,budget.amount,budget.date,user);
            return await createBudget(newBudget);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to create budget", 500);
        }
    }

    async getFilteredCategories(user:any){
        try{
            let budgetList = await this.getAllBudgets(user) as Budget[];
            let enumCategories = Object.values(BudgetCategory);

            return enumCategories.filter(cat=> budgetList.find(b => b.category === cat) === undefined);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to get filtered categories", 500);
        }
    }

    async getAllCategories(){
        try{
            return Object.values(BudgetCategory);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to get all categories", 500);
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
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to get budget by date", 500);
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
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to total spending", 500);
        }
    }

    async deleteBudget(user:any,id:any){
        try{
            return await deleteBudget(user,id);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to delete budget", 500);
        }
    }

    async getBudgetCategories(user:any){
        try{
            return await getBudgetCategories(user);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to get budget categories", 500);
        }
    }

    async getBudgetById(id:any){
        try{
            return await getBudgetById(id);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to get budget by id", 500);
        }
    }

    async updateBudgetById(budget:any,id:any){
        try{
            return await updateBudgetById(budget,id);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to update budget", 500);
        }
    }

    async getTotalBudgetByDate(user:any,startDate:any,endDate:any){
        try{
            return await getTotalBudgetByDate(user,startDate,endDate);
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError("Failed to get total budget", 500);
        }
    }
}