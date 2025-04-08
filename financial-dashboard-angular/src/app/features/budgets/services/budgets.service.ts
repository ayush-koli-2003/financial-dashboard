import { Injectable } from "@angular/core";
import { ExpenseCategory } from "../../../core/enums/expense-category.enum";
import { Budget } from "../../../core/models/Budget.model";
import { InvestmentCategory } from "../../../core/enums/investment-category.enum";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class BudgetsService{
    budgetList:Budget[]=[]
    updateBudgetSub:BehaviorSubject<any> = new BehaviorSubject(this.budgetList);
    updateBudgetObs$ = this.updateBudgetSub.asObservable();

    currDate:{month:string,year:string,time?:'string'}
    
    constructor(private http:HttpClient){
        this.budgetList=[];
        
        let date = new Date();
        this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
        this.updateBudgetSub.next(this.budgetList);
    }

    getBudgets(month:any,year:any){
        const params = `month=${month}&year=${year}`;
        return this.http.get(`http://localhost:3000/api/budget?${params}`);
    }

    addBudget(budget:any){
        let currdate = new Date();
        let date = currdate.toISOString();
        

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

    updateDate(newDate:{month:string,year:string}){
        this.currDate.month = newDate.month;
        this.currDate.year = newDate.year;

        console.log('date updated');
        

        this.updateBudgetSub.next(this.budgetList);
    }

    getDate(){
        return this.currDate;
    }
}