import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-update-profile',
  standalone: false,
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  updateProfileForm:FormGroup;
  inputControls = [{name:'firstname',label:'First name',type:'text'},{name:'lastname',label:'Last name',type:'text'},{name:'currencyPreference',label:'Currency',type:'select'}];
  currencyCategories:any[]=[];
  isSubmitted = false;
  @Output() closeEvent = new EventEmitter();

  constructor(private userProfileService:UserProfileService){
    this.updateProfileForm = new FormGroup({
      firstname: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      lastname: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      currencyPreference: new FormControl(null,[Validators.required]),
      notificationPreference: new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(){
    this.userProfileService.getCurrencyCategories().subscribe({
      next:(res:any)=>{
        this.currencyCategories = res.data;
      }
    })
  }

  onSubmit(){
    if(this.updateProfileForm.valid){
      console.log('valid');
      
      this.isSubmitted = true;
      this.userProfileService.updateProfile(this.updateProfileForm.value).subscribe({
        next:(res:any)=>{
          this.closeEvent.emit('updated')
        },
        error:(err)=>{
          this.isSubmitted =  false;
        }
      })
    }
  }
}
