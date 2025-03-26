import { Expense } from "../entities/expense.entity";
import { ExpenseCategory } from "../enums/expense.enum";
import { addExpense, getExpenseByDate, getExpenses } from "../repositories/expense.repository";

export class ExpenseService{
    async addExpense(expense:any,user:any){
        try{
            let newExpense = new Expense(expense.name,expense.category,expense.amount,expense.date,user,expense.note);
            return await addExpense(newExpense);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getExpenses(user:any){
        try{
            return await getExpenses(user);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getExpenseCategories(user:any){
        try{
            return Object.values(ExpenseCategory);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getExpenseByDate(user:any,startDate:any,endDate:any){
        try{
            

            // console.log(startDate,endDate);
            

            return await getExpenseByDate(user,startDate,endDate); 
        }
        catch(err){
            console.log(err);
            
        }
    }
}