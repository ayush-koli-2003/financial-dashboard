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
  private sendSubject = new Subject<void>();

  constructor(){
    this.sendSubject.pipe(
      throttleTime(30000)
    ).subscribe(() => {
      this.time = 180
      this.otpVerifyEvent.emit(this.otp);
    });
  }

  ngOnInit(){
    this.timer();
  }

  timer(){
    this.time = 180;
    setInterval(()=>{
      if(this.time>0){
        this.time--;
      }
      
    },1000);
  }

  submitOtp(){
    
    this.sendSubject.next();
  }

  resendOtp(){
    this.otp='';
    this.timer();
    this.otpResendEvent.emit();
  }
}
