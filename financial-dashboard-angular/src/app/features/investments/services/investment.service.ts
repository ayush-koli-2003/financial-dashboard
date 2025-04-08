import { Injectable } from "@angular/core";
import { Investment } from "../../../core/models/Investment.model";
import { InvestmentCategory } from "../../../core/enums/investment-category.enum";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class InvestmentService{
    investmentList:Investment[]=[];
    updateInvestmentListSub:BehaviorSubject<any> = new BehaviorSubject(this.investmentList);
    updateInvestementListObs$ = this.updateInvestmentListSub.asObservable();
    categories:any
    currDate:{month:string,year:string,time?:'string'};
    searchQuery:string;
    constructor(private http:HttpClient){
        let date = new Date();
        this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
        this.investmentList=[];
        this.updateInvestmentListSub.next(this.investmentList);
        this.searchQuery ='';
    }

    getInvestments(month:any,year:any,search:string){
        const params = `month=${month}&year=${year}&search=${search}`;
        return this.http.get(`http://localhost:3000/api/investment?${params}`,{withCredentials:true});
    }

    addInvestment(investment:any){
        if(investment.date===undefined){
            let currDate = new Date();

            investment.date = currDate.toISOString();
        }

        return this.http.post('http://localhost:3000/api/investment/add',investment,{withCredentials:true}).pipe(
            tap(response=>{
                this.updateInvestmentListSub.next(this.investmentList);
            }),
            catchError((err:HttpErrorResponse)=>{
                if (err.status === 404) {
                    this.updateInvestmentListSub.next(this.investmentList);
                }
    
                return throwError(() => err);
            })
        );
    }

    getCategories(){
        return this.http.get('http://localhost:3000/api/investment/categories',{withCredentials:true});
    }

    deleteInvestment(id:any){
        return this.http.delete(`http://localhost:3000/api/investment/delete/${id}`).pipe(
            tap(response=>{
                this.updateInvestmentListSub.next(this.investmentList);
            })
        );
    }

    getInvestmentById(id:any){
        return this.http.get(`http://localhost:3000/api/investment/${id}`);
    }

    editInvestment(investment:any,id:any){
        return this.http.patch(`http://localhost:3000/api/investment/update/${id}`,investment).pipe(
            tap(response=>{
                this.updateInvestmentListSub.next(this.investmentList);
            }),
            catchError((err:HttpErrorResponse)=>{
                if (err.status === 404) {
                    this.updateInvestmentListSub.next(this.investmentList);
                }
    
                return throwError(() => err);
            })
        );
    }

    updateDate(newDate:{month:string,year:string}){
        this.currDate.month = newDate.month;
        this.currDate.year = newDate.year;

        console.log('date updated');
        

        this.updateInvestmentListSub.next(this.investmentList);
    }

    getDate(){
        return this.currDate;
    }
    updateSearchQuery(search:string){
        this.searchQuery = search;
        this.updateInvestmentListSub.next(this.investmentList);
    }

    getSearchQuery(){
        return this.searchQuery;
    }
}