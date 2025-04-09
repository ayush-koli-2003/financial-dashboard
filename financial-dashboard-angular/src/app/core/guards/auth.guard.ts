import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()

export class AuthGuard implements CanActivate{
    currUser:any;
    constructor(private authService:AuthService,private router:Router){
        this.authService.currUserObs$.subscribe(
            (user)=>{
                this.currUser = user;       
                // this.authService.setRedirectAfterLogin(state.url);
            }
        )
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // this.authService.currUserObs$.subscribe(
        //     (user)=>{
        //         currUser = user;
        //     }
        // )
        

        if(this.currUser!==null){
            console.log(state.url.includes('/admin'));
            if(this.currUser.role === 'admin'){
                if(state.url.includes('/admin')){

                    return true;
                }
                else if(state.url===''){
                    this.router.navigate(['/admin']);
                }
                else{

                }
            }
            else if(this.currUser.role==='user'){
                if(!state.url.includes('/admin')){
                    console.log(state.url);
                    
                    return true;
                }
                else if(state.url=''){
                    this.router.navigate(['/dashboard'])
                }
            }
            else{
                
                return false;
            }
        }

        return this.router.navigate(['/login']);
    }
}