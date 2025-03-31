import { Injectable } from "@angular/core";
import { ExpenseCategory } from "../../../core/enums/expense-category.enum";
import { Budget } from "../../../core/models/Budget.model";
import { InvestmentCategory } from "../../../core/enums/investment-category.enum";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class BudgetsService{
    budgetList:Budget[]=[]
    updateBudgetSub:BehaviorSubject<any> = new BehaviorSubject(this.budgetList);
    updateBudgetObs$ = this.updateBudgetSub.asObservable();
    
    constructor(private http:HttpClient){
        this.budgetList=[{id:1,category:ExpenseCategory.Food,amount:4000,date:new Date()},{id:2,category:InvestmentCategory.Stocks,amount:2000,date:new Date()}];
        this.updateBudgetSub.next(this.budgetList);
    }

    getBudgets(month:any,year:any){
        const params = `month=${month}&year=${year}`;
        return this.http.get(`http://localhost:3000/api/budget?${params}`);
    }

    addBudget(budget:any){
        let currdate = new Date();
        let date = currdate.toISOString().split('T')[0];
        

        let newBudget:any = {date,...budget};
        
        return this.http.post('http://localhost:3000/api/budget/add',newBudget).pipe(
            tap(response=>{
                this.updateBudgetSub.next(this.budgetList);
            })
        );
    }

    getCategories(){
        return this.http.get('http://localhost:3000/api/budget/filteredCategories');
    }

    getAllCategories(){
        return this.http.get('http://localhost:3000/api/budget/categories');
    }

    getTotalSpendingOfCategory(month:any,year:any){
        const params = `month=${month}&year=${year}`
        return this.http.get(`http://localhost:3000/api/budget/getTotalSpendingOfCategory?${params}`);
    }

    deleteBudget(id:number){
        
        return this.http.delete(`http://localhost:3000/api/budget/delete/${id}`).pipe(
            tap(response=>{
                this.updateBudgetSub.next(this.budgetList);
            })
        );
    }

    getBudgetById(id:any){
        return this.http.get(`http://localhost:3000/api/budget/${id}`);
    }

    editBudget(budget:any,id:any){
        return this.http.patch(`http://localhost:3000/api/budget/update/${id}`,budget).pipe(
            tap(response=>{
                this.updateBudgetSub.next(this.budgetList);
            })
        );
    }
}