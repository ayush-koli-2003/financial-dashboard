import { ErrorHandler, Injectable} from '@angular/core';
import Swal from 'sweetalert2'
import { AuthService } from './auth.service';
 
@Injectable({
    providedIn:'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
 
    constructor(private authService:AuthService) { 
    }
  
    handleError(error:any) {
        console.log(error);
        if(error.status!==0){
            error.message = error.error.message;
        }
        else{
            error.message = 'Try again later!'
        }
        Swal.fire({
            icon: "error",
            title:'Something went wrong',
            text: `${error.message}`,
        }).then(
            (result:any)=>{
                if(error.status===0){
                    this.authService.logOut();
                }
            }
        );
   }
 
}