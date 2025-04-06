import { Injectable } from "@angular/core";
import { Income } from "../../../core/models/Income.model";
import { IncomeCategory } from "../../../core/enums/income-category.enum";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class IncomeService{
    incomeList:Income[]=[];
    updateIncomeListSub:BehaviorSubject<any> = new BehaviorSubject(this.incomeList);
    updateIncomeListObs$ = this.updateIncomeListSub.asObservable();
    currDate:{month:string,year:string,time?:'string'}
    constructor(private http:HttpClient){
        let date = new Date();
        this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
        this.updateIncomeListSub.next(this.incomeList);
    }

    getIncomes(month:any,year:any){
        const params = `month=${month}&year=${year}`
        return this.http.get(`http://localhost:3000/api/income?${params}`,{withCredentials:true});
    }

    addIncome(income:any){
        if(income.date === undefined){
            let currDate = new Date();
            income.date = currDate.toISOString().split("T")[0];
        }
        

        return this.http.post('http://localhost:3000/api/income/add',income,{withCredentials:true}).pipe(
            tap(response=>{
                this.updateIncomeListSub.next(this.incomeList);
            })
        );
    }

    getCategories(){
        return this.http.get('http://localhost:3000/api/income/categories',{withCredentials:true});
    }

    deleteIncome(id:any){
        return this.http.delete(`http://localhost:3000/api/income/delete/${id}`).pipe(
            tap(response=>{
                this.updateIncomeListSub.next(this.incomeList);
            })
        )
    }

    getIncomeById(id:any){
        return this.http.get(`http://localhost:3000/api/income/${id}`);
    }

    editIncome(income:any,id:any){
        return this.http.patch(`http://localhost:3000/api/income/update/${id}`,income).pipe(
            tap(response=>{
                this.updateIncomeListSub.next(this.incomeList);
            })
        );
    }

    updateDate(newDate:{month:string,year:string}){
        this.currDate.month = newDate.month;
        this.currDate.year = newDate.year;

        // console.log('date updated');
        

        this.updateIncomeListSub.next(this.incomeList);
    }

    getDate(){
        return this.currDate;
    }
}