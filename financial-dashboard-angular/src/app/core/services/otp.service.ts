import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";

const serverUrl = 'http://localhost:3000';

@Injectable({
    providedIn:'root'
})

export class OtpService{

    
    constructor(private http:HttpClient,private router:Router){

    }

    generateOtp(data:{email:string,type:string}){
        return this.http.post(`${serverUrl}/otp/generate`,data);
    }

    verifyOtp(data:{user:{email:string},otp:string,type:string}){
        return this.http.post(`${serverUrl}/auth/forgotPassword`,data);
    }

    forgotPassword(data:{user:{email:string,password:string},otp:string,type:string}){
        return this.http.post(`${serverUrl}/auth/forgotPassword`,data).pipe(
            tap((res:any)=>{
                if(res.status==='successfull'){
                    this.router.navigate(['/login']);
                }
            })
        )
    }
}