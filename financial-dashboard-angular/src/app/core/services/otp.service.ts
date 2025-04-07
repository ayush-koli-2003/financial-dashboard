import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const serverUrl = 'http://localhost:3000';

@Injectable({
    providedIn:'root'
})

export class OtpService{

    
    constructor(private http:HttpClient){

    }

    generateOtp(data:{email:string,type:string}){
        return this.http.post(`${serverUrl}/otp/generate`,data);
    }
}