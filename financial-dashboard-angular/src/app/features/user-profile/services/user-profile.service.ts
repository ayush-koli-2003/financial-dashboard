import { Injectable } from "@angular/core";
import { Profile } from "../../../core/models/Profile.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../core/services/auth.service";

@Injectable({
    providedIn:'root'
})

export class UserProfileService{
    userProfile:Profile={};
    userProfileSub:BehaviorSubject<any> = new BehaviorSubject(this.userProfile);
    userProfileObs$ = this.userProfileSub.asObservable();

    constructor(private http:HttpClient, private authService:AuthService){
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

    changePassword(user:any){
        return this.authService.changePassword(user);
    }
}