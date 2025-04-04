import { ErrorHandler, Injectable} from '@angular/core';
import Swal from 'sweetalert2'
import { AuthService } from './auth.service';
 
@Injectable({
    providedIn:'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
 
    constructor(private authService:AuthService) { 
    }
  
    handleError(error:Error) {
        Swal.fire({
            icon: "error",
            title:'Something went wrong',
            text: `${error.message}`,
        }).then(
            (result:any)=>{
                this.authService.logOut();
            }
        );
   }
 
}