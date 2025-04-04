import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Profile } from '../../../../core/models/Profile.model';
import { UserProfileService } from '../../services/user-profile.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-display-profile',
  standalone: false,
  templateUrl: './display-profile.component.html',
  styleUrl: './display-profile.component.css'
})
export class DisplayProfileComponent implements OnInit, AfterViewInit{
  userProfile:any;
  isUpdateVisible = false;
  isProfileLoaded = false;
  keys:any[]=[];
  user:any;
  @ViewChild(UpdateProfileComponent) updateProfile!:UpdateProfileComponent;
  isChangePasswordVisible: boolean = false;

  constructor(private userProfileService:UserProfileService){

  }

  ngOnInit(){
    this.getUserProfile();
  }

  ngAfterViewInit(): void {

  }

  getUserProfile(){
    this.userProfileService.getUserProfile().subscribe({
      next:(res:any)=>{
        let {user,...profile} = res.data;
        this.userProfile = profile;
        this.user = user;
        console.log(this.userProfile);
        this.keys = Object.keys(this.userProfile);
        this.isProfileLoaded = true;
      },
      error:(err)=>{
        // console.log(err);
        this.userProfile=undefined;
        console.log('profile not found');
        this.openUpdate();
      }
    })
  }

  openUpdate(){
    this.isUpdateVisible = true;

    // if(this.updateProfile){
    //   this.updateProfile.closeEvent.subscribe({
    //     next:(res:any)=>{
    //       this.closeUpdate();
    //     }
    //   })
    // }
  }

  closeUpdate(){
    this.isUpdateVisible = false;
  }

  openChangePassword(){
    this.isChangePasswordVisible= true;
  }

  closeChangePassword(){
    this.isChangePasswordVisible= false;
  }
}
