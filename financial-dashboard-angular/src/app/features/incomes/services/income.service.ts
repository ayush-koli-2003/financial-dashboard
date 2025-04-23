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
    currDate:{month:string,year:string,time?:'string'};
    searchQuery:string;
    filter:{filterBy?:any,sortBy?:any}={};

    constructor(private http:HttpClient){
        let date = new Date();
        this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
        this.updateIncomeListSub.next(this.incomeList);
        this.searchQuery ='';
    }

    getIncomes(month:any,year:any,search:string,limit:number,offset:number,filterBy?:string,sortBy?:string){
         const params = `month=${month}&year=${year}&search=${search}&limit=${limit}&offset=${offset}&filterBy=${filterBy}&sortBy=${sortBy}`
        return this.http.get(`http://localhost:3000/api/income?${params}`,{withCredentials:true});
    }

    updateFilters( filter:{filterBy?:any,sortBy?:any}){
        this.filter.filterBy=filter.filterBy;
        this.filter.sortBy = filter.sortBy;
        this.updateIncomeListSub.next(this.incomeList);
    }

    getTotalIncomeRecord(month:any,year:any,search:string,filterBy?:string,sortBy?:string){
        let params = `month=${month}&year=${year}&search=${search}&filterBy=${filterBy}`;
        return this.http.get(`http://localhost:3000/api/expense/total?${params}`);
    }

    getFilters(){
        return this.filter; 
    }

    addIncome(income:any){
        if(income.date === undefined){
            let currDate = new Date();
            income.date = currDate.toISOString();
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

    updateSearchQuery(search:string){
        this.searchQuery = search;
        this.updateIncomeListSub.next(this.incomeList);
    }

    getSearchQuery(){
        return this.searchQuery;
    }
}