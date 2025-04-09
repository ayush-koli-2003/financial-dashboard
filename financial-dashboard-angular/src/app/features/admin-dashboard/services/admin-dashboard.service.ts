import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../../core/models/User.model";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class AdminDashboardService{
    userList!:User[];
    userListSub!:BehaviorSubject<any>;
    userListObs$!:Observable<any>;
    constructor(private http:HttpClient){
        this.userList = [];
        this.userListSub = new BehaviorSubject(this.userList);
        this.userListObs$ = this.userListSub.asObservable();
        this.userListSub.next(this.userList);
    }

    getAdminDashboardData(month:any,year:any){
        const params = `month=${month}&year=${year}`;
        return this.http.get(`http://localhost:3000/api/admin/dashboardData?${params}`);
    }

    getAllUsers(){
        return this.http.get(`http://localhost:3000/api/admin/allUsers`);
    }

    changeStatus(id:number){
        return this.http.get(`http://localhost:3000/api/admin/changeStatus/${id}`).pipe(
            tap(res=>{
                this.userListSub.next(this.userList);
            })
        );
    }
}