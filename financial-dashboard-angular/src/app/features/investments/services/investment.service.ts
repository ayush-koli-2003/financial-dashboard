import { Injectable } from "@angular/core";
import { Investment } from "../../../core/models/Investment.model";
import { InvestmentCategory } from "../../../core/enums/investment-category.enum";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class InvestmentService{
    investmentList:Investment[]=[];
    updateInvestmentListSub:BehaviorSubject<any> = new BehaviorSubject(this.investmentList);
    updateInvestementListObs$ = this.updateInvestmentListSub.asObservable();
    categories:any
    constructor(private http:HttpClient){
        this.investmentList=[];
    }

    getInvestments(month:any,year:any){
        const params = `month=${month}&year=${year}`
        return this.http.get(`http://localhost:3000/api/investment?${params}`,{withCredentials:true});
    }

    addInvestment(investment:any){
        if(investment.date===undefined){
            let currDate = new Date();

            investment.date = currDate.toISOString().split('T')[0];
        }

        return this.http.post('http://localhost:3000/api/investment/add',investment,{withCredentials:true}).pipe(
            tap(response=>{
                this.updateInvestmentListSub.next(this.investmentList);
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
}