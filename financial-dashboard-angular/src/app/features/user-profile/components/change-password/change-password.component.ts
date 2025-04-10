import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordForm:FormGroup
  @Output() closeEvent = new EventEmitter();
  inputControls = [{name:'currPassword',label:'Current Password',type:'password'},{name:'newPassword',label:'New Password',type:'password'}]
  serverError!:string[];

  constructor(private userProfileService:UserProfileService){
    this.changePasswordForm = new FormGroup({
      currPassword: new FormControl(null,[Validators.minLength(6),Validators.required,Validators.pattern(/^\S*$/)]),
      newPassword: new FormControl(null,[Validators.minLength(6),Validators.required,Validators.pattern(/^\S*$/)])
    })
  }

  onSubmit(value:any){
    this.serverError = [];
    this.userProfileService.changePassword(value).subscribe({
      next:()=>{
        this.closeEvent.emit();
        Swal.fire({
          title: "Success",
          text: "Change password successfull",
          icon: "success"
        });
      },
      error:(err:any)=>{
        this.serverError?.push(err);
        throw err;
      }
    })
  }
}
