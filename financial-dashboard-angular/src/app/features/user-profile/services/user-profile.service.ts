import { Injectable } from "@angular/core";
import { Profile } from "../../../core/models/Profile.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class UserProfileService{
    userProfile:Profile={};
    userProfileSub:BehaviorSubject<any> = new BehaviorSubject(this.userProfile);
    userProfileObs$ = this.userProfileSub.asObservable();

    constructor(private http:HttpClient){
    }

    getUserProfile(){
        return this.http.get('http://localhost:3000/api/profile');
    }

    getCurrencyCategories(){
        return this.http.get('http://localhost:3000/api/profile/currencyCategories')
    }

    updateProfile(value:any){
        return this.http.post('http://localhost:3000/api/profile/update',value);
    }
}