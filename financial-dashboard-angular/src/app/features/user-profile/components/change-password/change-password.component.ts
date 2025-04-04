import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordForm:FormGroup
  @Output() closeEvent = new EventEmitter();
  inputControls = [{name:'email',label:'Email',type:'email'},{name:'currPassword',label:'Current Password',type:'password'},{name:'newPassword',label:'New Password',type:'password'}]

  constructor(private userProfileService:UserProfileService){
    this.changePasswordForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      currPassword: new FormControl(null,[Validators.required,Validators.pattern(/^\S*$/)]),
      newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^\S*$/)])
    })
  }

  onSubmit(value:any){
    this.userProfileService.changePassword(value).subscribe({
      next:(res:any)=>{
        this.closeEvent.emit();
      }
    })
  }
}
