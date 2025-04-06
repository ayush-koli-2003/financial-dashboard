import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';
import { Profile } from '../../../../core/models/Profile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  standalone: false,
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit, OnChanges {
  updateProfileForm:FormGroup;
  inputControls = [{name:'firstname',label:'First name',type:'text'},{name:'lastname',label:'Last name',type:'text'},{name:'currencyPreference',label:'Currency',type:'select'}];
  currencyCategories:any[]=[];
  isSubmitted = false;
  @Input() currData!:Partial<Profile>
  @Output() closeEvent = new EventEmitter();

  constructor(private userProfileService:UserProfileService){
    this.updateProfileForm = new FormGroup({
      firstname: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern(/^\S*$/)]),
      lastname: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern(/^\S*$/)]),
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

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currData']){
      if(this.currData){
        this.updateProfileForm.patchValue(this.currData);
      }

    }
  }
  onSubmit(){
    if(this.updateProfileForm.valid){
      console.log('valid');
      
      this.isSubmitted = true;
      this.userProfileService.updateProfile(this.updateProfileForm.value).subscribe({
        next:(res:any)=>{
          this.closeEvent.emit('updated')
          Swal.fire({
            title: "Success",
            text: "Update profile successfull",
            icon: "success"
          });
        },
        error:(err)=>{
          this.isSubmitted =  false;
          throw err;
        }
      })
    }
  }
}
