import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, throttleTime } from 'rxjs';

@Component({
  selector: 'app-otp-verification',
  standalone: false,
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
  @Input() serverError!:string[];
  otp!:string;
  @Output() otpVerifyEvent= new EventEmitter();
  @Output() otpResendEvent = new EventEmitter();

  time = 180;
  private resendSubject = new Subject<void>();

  constructor(){
    this.resendSubject.pipe(
      throttleTime(180000)
    ).subscribe(() => {
      this.time = 180
      this.otpVerifyEvent.emit(this.otp);
    });
  }

  ngOnInit(){
    this.time = 180;
    setInterval(()=>{
      if(this.time>0){
        this.time--;
      }
      
    },1000);
  }

  submitOtp(){
    
    this.resendSubject.next();
  }

  resendOtp(){
    this.otp='';
    
    this.otpResendEvent.emit();
  }
}
