import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { OtpService } from '../../../core/services/otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup;

  isOtpVisible=false;

  constructor(private otpService:OtpService,private authService:AuthService,private router:Router){
    this.registerForm = new FormGroup({
      username: new FormControl(null,[Validators.required,Validators.pattern(/^\S*$/)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern(/^\S*$/)])
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      // this.authService.register(this.registerForm.value).subscribe(
      //   (response:any)=>{
      //     console.log(response);
          
      //     if(response.status==='failed'){
      //       console.log('User already exists');
      //     }
      //     else{
      //       this.router.navigate(['/login'])
      //     }
      //   }
      // );
      this.otpService.generateOtp({email:this.registerForm.value['email'],type:'register'}).subscribe({
        next:(res:any)=>{
          console.log(res.data);
          this.isOtpVisible=true;
        }
      })
    }
  }

  onOtpResend(){
    this.otpService.generateOtp({email:this.registerForm.value['email'],type:'register'}).subscribe(
      ()=>{
        
      }
    )
  }

  onOtpSubmit(otp:string){
    
    this.isOtpVisible = false;
    console.log(otp);
    this.authService.register({user:this.registerForm.value,otp:otp,type:'register'}).subscribe(
      (response:any)=>{
        console.log(response);
        if(response.status==='failed'){
          console.log('User already exists');
        }
        else{
          Swal.fire({
            text: "User is Registered!",
            icon: "success"
          });
          this.router.navigate(['/login'])
        }
      }
    );
  }

  onDialogCLose(){
    this.isOtpVisible=false;
  }

}
