import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // this.authService.currUserObs$.subscribe(
        //     (user)=>{
        //         currUser = user;
        //     }
        // )

        let currUser:any;

        this.authService.currUserObs$.subscribe(
            (user)=>{
                currUser = user;

                if(currUser!==null){
                    return true;
                }
        
                this.authService.setRedirectAfterLogin(state.url);
                    
                return this.router.navigate(['/login']);
            }
        )
    }
}