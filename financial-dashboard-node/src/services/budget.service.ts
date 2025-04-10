import { Budget } from "../entities/budget.entity";
import { User } from "../entities/user.entity";
import { BudgetCategory } from "../enums/budget.enum";
import { ExpenseCategory } from "../enums/expense.enum";
import { InvestmentCategory } from "../enums/investment.enum";
import { createBudget, deleteBudget, findBudgetByCategory, getAllBudgets, getBudgetById, getBudgetCategories, getBudgetsByDate, getTotalBudgetByDate, updateBudgetById } from "../repositories/budget.repository";
import { AppError } from "../types/app-error";
import { ExpenseService } from "./expenses.service";
import { InvestmentService } from "./investment.service";


const investmentService = new InvestmentService();
export class BudgetService{
    async getAllBudgets(user:Partial<User>){
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
    async createBudget(budget:any,user:User){
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

    async getFilteredCategories(user:Partial<User>){
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

    async getBudgetByDate(user:Partial<User>,startDate:any,endDate:any){
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

    async getTotalSpendingOfCategory(user:Partial<User>,startDate:any,endDate:any){
        try{
            const expenseService = new ExpenseService();
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

    async deleteBudget(user:Partial<User>,id:any){
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

    async getBudgetCategories(user:Partial<User>){
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

    async updateBudgetById(budget:Partial<Budget>,id:any){
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

    async getTotalBudgetByDate(user:Partial<User>,startDate:any,endDate:any){
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

    async findBudgetByCategory(user:any,startDate:any,endDate:any,category:BudgetCategory){
        try{
            return await findBudgetByCategory(user,startDate,endDate,category);
        }
        catch(err){
            throw err;
        }
    }
}