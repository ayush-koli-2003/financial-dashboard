import { Injectable } from "@angular/core";
import { Income } from "../../../core/models/Income.model";
import { IncomeCategory } from "../../../core/enums/income-category.enum";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class IncomeService{
    incomeList:Income[]=[];
    updateIncomeListSub:BehaviorSubject<any> = new BehaviorSubject(this.incomeList);
    updateIncomeListObs$ = this.updateIncomeListSub.asObservable();
    constructor(private http:HttpClient){
        this.incomeList=[];
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
        this.updateIncomeListSub.next(this.incomeList);

        return this.http.post('http://localhost:3000/api/income/add',income,{withCredentials:true});
    }

    getCategories(){
        return this.http.get('http://localhost:3000/api/income/categories',{withCredentials:true});
    }
}