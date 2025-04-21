import { Expense } from "../entities/expense.entity";
import { User } from "../entities/user.entity";
import { BudgetCategory } from "../enums/budget.enum";
import { ExpenseCategory } from "../enums/expense.enum";
import { addExpense, deleteExpense, getExpenseByDate, getExpenseByDateWithLimit, getExpenseByDateWithSearch, getExpenseByDateWithSearchWithLimit, getExpenseById, getExpenses, getTotalExpenseByDate, getTotalExpenseOfCategory, groupExpenseByMonth, updateExpenseById } from "../repositories/expense.repository";
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

            else{
                

                // console.log(budget.amount);

                newExpense = new Expense(expense.name,expense.category,expense.amount,expense.date,user,expense.note,budget);
                await addExpense(newExpense); 

                let totalExpense = await this.getTotalExpenseOfCategory(user,startDate,endDate,budget.category);   
                if(totalExpense.total+expense.amount > budget.amount){
                    
                    throw new AppError('Expense has exceeded the budget',404);
                }
                
            }
            
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

    async getExpenseByDate(user:any,startDate:any,endDate:any,filterBy?:string,search?:string){
        try{
            

            // console.log(startDate,endDate);
            

            if(filterBy===undefined||filterBy==='undefined'){
                filterBy=''
            }
            
            
            
            if(search && search.length > 0){
                return await getExpenseByDateWithSearch(user,startDate,endDate,filterBy,search);
            }
            else{
                return await getExpenseByDate(user,startDate,endDate,filterBy);
            }
            
        }
        catch(err){
            throw err;
            
        }
    }

    async getExpenseByDateWithLimit(user:any,startDate:any,endDate:any,limit:number,offset:number,filterBy:string,sortBy:'ASC'|'DESC'|undefined,search?:string){
        try{
            

            // console.log(startDate,endDate);
            let result;
            if(search && search.length > 0){
                result = await getExpenseByDateWithSearchWithLimit(user,startDate,endDate,limit,offset,filterBy,sortBy,search);
            }
            else{
                result = await getExpenseByDateWithLimit(user,startDate,endDate,limit,offset,filterBy,sortBy);
            }
            
            
            return result;
            
        }
        catch(err){
            throw err;
            
        }
    }

    async getTotalExpenseOfCategory(user:Partial<User>,startDate:string,endDate:string,category:BudgetCategory){
        try{
            return await getTotalExpenseOfCategory(user,startDate,endDate,category);
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
            else{
                

                // console.log(budget.amount);

                await updateExpenseById(expense,id);
                            
                let totalExpense = await this.getTotalExpenseOfCategory(user,startDate,endDate,budget.category);   
                if(totalExpense.total+expense.amount > budget.amount){
                    
                    throw new AppError('Expense has exceeded the budget!',404);
                }
                
            }
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