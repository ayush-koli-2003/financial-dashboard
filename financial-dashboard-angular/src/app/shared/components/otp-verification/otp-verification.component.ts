import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  submitOtp(){
    this.otpVerifyEvent.emit(this.otp);
  }
}
