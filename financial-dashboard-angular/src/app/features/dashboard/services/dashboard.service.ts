import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class DashboardService{
    month:any;
    year:any;
    constructor(private http:HttpClient){
        let date = new Date();
        this.month = date.getMonth()+1;
        this.year = date.getFullYear();
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
    
}