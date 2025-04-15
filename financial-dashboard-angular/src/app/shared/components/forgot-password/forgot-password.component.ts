import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { OtpService } from '../../../core/services/otp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm!:FormGroup;
  inputControls!:any[];
  serverError!:string[];
  isOtpVisible:boolean = false;
  otp!:string;
  email!:string;
  @Output() closeEvent = new EventEmitter();

  constructor(private router:Router,private authService:AuthService,private otpService:OtpService){

  }

  ngOnInit(){
    this.forgotPasswordForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email])})

    this.inputControls = [{name:'email',label:"Email",type:'text'}]
  }

  onSubmit(value:any){
    console.log('submitted');
    
    if(value!=='exit'){
      console.log(value);
      
      if(!value.password){
        this.email = value.email;
        this.otpService.generateOtp({email:value.email,type:'forgot-password'}).subscribe({
          next:(res:any)=>{
            this.isOtpVisible = true;
            Swal.fire({
              text: "OTP is sent to email!",
              icon: "success"
            });
          },
          error:(err:any)=>{
            this.serverError=[];
            this.serverError.push('error')
            throw err;
          }
        })
      }
      else{
        this.otpService.forgotPassword({user:{email:this.email,password:value.password},otp:this.otp,type:'forgot-password'}).subscribe({
          next:(res:any)=>{
            Swal.fire({
              text: "Password is changed",
              icon: "success"
            });
            this.closeEvent.emit();
          },
          error:(err:any)=>{
            this.serverError=[];
            this.serverError.push('error')
            throw err;
          }
        })
      }
    }
  }

  onOtpSubmit(otp:string){
    this.otp = otp;
    this.otpService.verifyOtp({otp:otp,user:{email:this.email},type:'forgot-password'}).subscribe({
      next:(res:any)=>{
        this.isOtpVisible = false;
        this.forgotPasswordForm = new FormGroup({password:new FormControl(null,[Validators.required,Validators.minLength(6)])
        })
        this.inputControls = [{name:'password',label:"New password",type:'password'}]
      }
    })

  }
}
