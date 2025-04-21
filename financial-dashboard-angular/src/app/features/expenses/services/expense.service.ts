import { Injectable } from "@angular/core";
import { Expense } from "../../../core/models/Expense.model";
import { ExpenseCategory } from "../../../core/enums/expense-category.enum";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class ExpenseService{
    expenseList:Expense[]=[];
    updateExpenseListSub:BehaviorSubject<any> = new BehaviorSubject(this.expenseList);
    updateExpenseList$ = this.updateExpenseListSub.asObservable();
    currDate:{month:string,year:string,time?:'string'};
    searchQuery:string;
    filter:{filterBy?:any,sortBy?:any}={};
    constructor(private http:HttpClient){
        let date = new Date();
        this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
        this.updateExpenseListSub.next(this.expenseList);
        this.searchQuery ='';
    }

    getExpenseList(month:any,year:any,search:string,limit:number,offset:number,filterBy?:string,sortBy?:string){
        // console.log(search);
        
        const params = `month=${month}&year=${year}&search=${search}&limit=${limit}&offset=${offset}&filterBy=${filterBy}&sortBy=${sortBy}`;
        // this.expenseList.sort((a,b)=> a.date.toDateString() > b.date.toDateString() ? -1:1);
        return this.http.get(`http://localhost:3000/api/expense/?${params}`,{withCredentials:true});
    }

    addExpense(expense:any){
        let currdate = new Date();
        let date = currdate.toISOString();
        

        let newExpense:any = {date,...expense};
        // // this.expenseList.push(newExpense);
        // // this.expenseListSub.next(this.expenseList);

        return this.http.post('http://localhost:3000/api/expense/add',newExpense,{withCredentials:true}).pipe(
            tap(response=>{
                console.log(response);
                                
                this.updateExpenseListSub.next(this.expenseList);
            }),
            catchError((err:HttpErrorResponse)=>{
                if (err.status === 404) {
                    this.updateExpenseListSub.next(this.expenseList);
                }
    
                return throwError(() => err);
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
            }),
            catchError((err:HttpErrorResponse)=>{
                if (err.status === 404) {
                    this.updateExpenseListSub.next(this.expenseList);
                }
    
                return throwError(() => err);
            })
        );
    }

    updateDate(newDate:{month:string,year:string}){
        this.currDate.month = newDate.month;
        this.currDate.year = newDate.year;

        console.log('date updated');
        

        this.updateExpenseListSub.next(this.expenseList);
    }

    getDate(){
        return this.currDate;
    }

    updateSearchQuery(search:string){
        this.searchQuery = search;
        this.updateExpenseListSub.next(this.expenseList);
    }

    updateFilters( filter:{filterBy?:any,sortBy?:any}){
        this.filter.filterBy=filter.filterBy;
        this.filter.sortBy = filter.sortBy;
        this.updateExpenseListSub.next(this.expenseList);
    }

    getTotalExpenseRecord(month:any,year:any,search:string,filterBy?:string,sortBy?:string){
        let params = `month=${month}&year=${year}&search=${search}&filterBy=${filterBy}`;
        return this.http.get(`http://localhost:3000/api/expense/total?${params}`);
    }

    getSearchQuery(){
        return this.searchQuery;
    }

    getFilters(){
        return this.filter; 
    }
}