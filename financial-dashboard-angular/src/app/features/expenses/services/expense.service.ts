import { Injectable } from "@angular/core";
import { Expense } from "../../../core/models/Expense.model";
import { ExpenseCategory } from "../../../core/enums/expense-category.enum";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class ExpenseService{
    expenseList:Expense[]=[];
    updateExpenseListSub:BehaviorSubject<any> = new BehaviorSubject(this.expenseList);
    updateExpenseList$ = this.updateExpenseListSub.asObservable();
    constructor(private http:HttpClient){
        
    }

    getExpenseList(month:any,year:any){
        const params = `month=${month}&year=${year}`;
        // this.expenseList.sort((a,b)=> a.date.toDateString() > b.date.toDateString() ? -1:1);
        return this.http.get(`http://localhost:3000/api/expense/?${params}`,{withCredentials:true});
    }

    addExpense(expense:any){
        let currdate = new Date();
        let date = currdate.toISOString().split('T')[0];
        

        let newExpense:any = {date,...expense};
        // // this.expenseList.push(newExpense);
        // // this.expenseListSub.next(this.expenseList);

        return this.http.post('http://localhost:3000/api/expense/add',newExpense,{withCredentials:true}).pipe(
            tap(response=>{
                this.updateExpenseListSub.next(this.expenseList);
            })
        );
    }

    getExpenseCategories(){
        return this.http.get('http://localhost:3000/api/expense/categories',{withCredentials:true});
    }

    deleteExpense(id:any){
        return this.http.delete(`http://localhost:3000/api/expense/delete/${id}`).pipe(
            tap(response=>{
                this.updateExpenseListSub.next(this.expenseList);
            })
        )
    }

    getExpenseById(id:any){
        return this.http.get(`http://localhost:3000/api/expense/${id}`);
    }

    editExpense(expense:any,id:any){
        return this.http.patch(`http://localhost:3000/api/expense/update/${id}`,expense).pipe(
            tap(response=>{
                this.updateExpenseListSub.next(this.expenseList);
            })
        );
    }
}