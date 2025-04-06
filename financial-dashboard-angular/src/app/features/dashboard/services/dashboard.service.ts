import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class DashboardService{
    currDate:{month:string,year:string,time?:'string'};
    currDateSub:BehaviorSubject<any>
    currDateObs$:Observable<any>;

    constructor(private http:HttpClient){
        let date = new Date();
        this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
        this.currDateSub = new BehaviorSubject(this.currDate);
        this.currDateObs$ = this.currDateSub.asObservable();
    }

    // getDateOfData

    getDashboardData(month:any,year:any){
        const params = `month=${month}&year=${year}`
        return this.http.get(`http://localhost:3000/api/dashboard?${params}`);
    }

    getDashboardTransactions(month:any,year:any){
        const params = `month=${month}&year=${year}`
        return this.http.get(`http://localhost:3000/api/dashboard/transactions?${params}`);
    }

    getReports(month:any,year:any){
        const params = `month=${month}&year=${year}`;
        return this.http.get(`http://localhost:3000/api/report/monthly?${params}`,{withCredentials:true});
    }

    getTrendReports(month:any,year:any,pastMonths:any){
        const params = `month=${month}&year=${year}&pastMonths=${pastMonths}`;
        return this.http.get(`http://localhost:3000/api/report/trends?${params}`,{withCredentials:true});
    }
    
    updateDate(newDate:{month:string,year:string}){
        this.currDate.month = newDate.month;
        this.currDate.year = newDate.year;
        

        this.currDateSub.next(this.currDate);
    }
}