import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class RequestInterceptor implements HttpInterceptor{

    constructor(private authService:AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials:true
        })
               
        return next.handle(req).pipe(
            tap(event=>{
                if(event instanceof HttpResponse){
                    if( event.body.data instanceof String && ((event.body.data as string).includes('not found') || (event.body.data as string).includes('expired'))){
                        this.authService.logOut();
                    }
                }
            })
        );
    }
}