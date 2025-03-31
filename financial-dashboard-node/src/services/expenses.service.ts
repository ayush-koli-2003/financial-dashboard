import { Expense } from "../entities/expense.entity";
import { ExpenseCategory } from "../enums/expense.enum";
import { addExpense, deleteExpense, getExpenseByDate, getExpenseById, getExpenses, updateExpenseById } from "../repositories/expense.repository";

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

    async getExpenseById(id:any){
        try{
            return await getExpenseById(id);
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
            console.log(err);
            
        }
    }

    async deleteExpense(user:any,id:any){
        try{
            return await deleteExpense(user,id);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async updateExpenseById(expense:any,id:any){
        try{
            return await updateExpenseById(expense,id);
        }
        catch(err){
            console.log(err);
            
        }
    }
}