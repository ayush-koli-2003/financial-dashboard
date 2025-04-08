import { Expense } from "../entities/expense.entity";
import { ExpenseCategory } from "../enums/expense.enum";
import { addExpense, deleteExpense, getExpenseByDate, getExpenseByDateWithSearch, getExpenseById, getExpenses, getTotalExpenseByDate, groupExpenseByMonth, updateExpenseById } from "../repositories/expense.repository";
import { AppError } from "../types/app-error";
import { BudgetService } from "./budget.service";


export class ExpenseService{
    constructor(){

    }
    async addExpense(expense:any,user:any,startDate:string,endDate:string){
        try{
            const budgetService = new BudgetService();
            let budget= await budgetService.findBudgetByCategory(user,startDate,endDate,expense.category);
            // console.log(budget);
            let newExpense;
            if(!budget){
                newExpense = new Expense(expense.name,expense.category,expense.amount,expense.date,user,expense.note);
                await addExpense(newExpense);
                throw new AppError('Budget does not exist!',404);
            }

            newExpense = new Expense(expense.name,expense.category,expense.amount,expense.date,user,expense.note,budget);
            return await addExpense(newExpense);
            
        }
        catch(err){
            throw err;
            
        }
    }

    async getExpenses(user:any){
        try{
            return await getExpenses(user);
        }
        catch(err){
            throw err;
            
        }
    }

    async getExpenseCategories(user:any){
        try{
            return Object.values(ExpenseCategory);
        }
        catch(err){
            throw err;
            
        }
    }

    async getExpenseById(id:any){
        try{
            return await getExpenseById(id);
        }
        catch(err){
            throw err;
            
        }
    }

    async getExpenseByDate(user:any,startDate:any,endDate:any,search?:string){
        try{
            

            // console.log(startDate,endDate);
            
            if(search && search.length > 0){
                return await getExpenseByDateWithSearch(user,startDate,endDate,search);
            }
            else{
                return await getExpenseByDate(user,startDate,endDate);
            }
            
        }
        catch(err){
            throw err;
            
        }
    }

    async getTotalExpenseByCategory(user:any,startDate:any,endDate:any){
        try{
            let expenses = await getExpenseByDate(user,startDate,endDate);
            let expenseCategories = [...new Set(expenses?.map(e=>e.category))];
            let totalExpenseByCategory:any[]=[]
            expenseCategories.forEach(
                (cat)=>{
                    let expenseOfCategory = expenses?.filter(e=> e.category === cat);
                    let totalExpense = expenseOfCategory?.reduce((total,e)=> total+e.amount,0);

                    totalExpenseByCategory.push({category:cat,totalExpense:totalExpense});
                }
            )
            return totalExpenseByCategory;
        }
        catch(err){
            throw err;
            
        }
    }

    async deleteExpense(user:any,id:any){
        try{
            return await deleteExpense(user,id);
        }
        catch(err){
            throw err;
            
        }
    }

    async updateExpenseById(user:any,startDate:any,endDate:any,expense:any,id:any){
        try{
            const budgetService = new BudgetService();
            let budget= await budgetService.findBudgetByCategory(user,startDate,endDate,expense.category);
            // console.log(budget);
            // let newExpense;
            if(!budget){
                await updateExpenseById(expense,id);
                throw new AppError('Budget does not exist!',404);
            }

            // newExpense = new Expense(expense.name,expense.category,expense.amount,expense.date,user,expense.note,budget);


            return await updateExpenseById(expense,id);
        }
        catch(err){
            throw err;
            
        }
    }

    async getTotalExpenseByDate(user:any,startDate:any,endDate:any){
        try{
            return await getTotalExpenseByDate(user,startDate,endDate);
        }
        catch(err){
            throw err;
            
        }
    }

    async groupExpenseByMonth(user:any,startDate:any,endDate:any){
        try{
            return await groupExpenseByMonth(user,startDate,endDate);
        }
        catch(err){
            throw err;
            
        }
    }
}