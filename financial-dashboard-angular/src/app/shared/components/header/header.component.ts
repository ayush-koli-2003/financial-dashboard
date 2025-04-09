import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged:boolean = false;
  isNotificationVisible:boolean = false;
  profileItems: MenuItem[] | undefined;
  items:MenuItem[] | undefined;
  adminItems!:MenuItem[];
  currUser:any;
  isAvatarVisible=false;
  constructor(private authService:AuthService,private router:Router){ 
  }

  ngOnInit(){
    this.authService.currUserObs$.subscribe(
      (user)=>{
        if(user===null){
          this.isLogged = false;
          this.items=[];
          this.profileItems=[];
          this.isAvatarVisible=false;
          
        }
        else{
          this.isAvatarVisible=true;
          this.isLogged = true;
          this.currUser = user;
          this.items = [
            {
              label: 'Admin Dashboard',
              command:()=>{
                this.router.navigate(['/admin'])
              },
              visible:this.currUser?.role==='admin'
            },
            {
              label: 'Dashboard',
              command:()=>{
                this.router.navigate(['/dashboard'])
              },
              visible:this.currUser?.role==='user'
            },
            {
              label: 'Expense',
              command:()=>{
                this.router.navigate(['/expenses'])
              },
              visible:this.currUser?.role==='user'
            },
            {
              label: 'Budget',
              command:()=>{
                this.router.navigate(['/budgets'])
              },
              visible:this.currUser?.role==='user'
            },
            {
              label: 'Income',
              command:()=>{
                this.router.navigate(['/incomes'])
              },
              visible:this.currUser?.role==='user'
            },
            {
              label: 'Investment',
              command:()=>{
                this.router.navigate(['/investments'])
              },
              visible:this.currUser?.role==='user'
            },
            {
              label: 'Report',
              command:()=>{
                this.router.navigate(['/reports'])
              },
              visible:this.currUser?.role==='user'
            },
          ];
      
          this.profileItems = [
            {
                items: [
                  {
                    label: 'Profile',
                    icon: 'pi pi-cog',
                    command:()=>{
                      this.router.navigate(['/profile'])
                    },
                    visible:this.currUser?.role==='user'
                  },
                  {
                    label: 'Sign Out',
                    icon: 'pi pi-sign-out',
                    command:()=>{
                      this.logOut();
                    }
                  }
                ]
            }
          ];
        }
      }
    )
  }

  

  logOut(){
    this.authService.logOut();
  }

  showNotificationPanel(){
    this.isNotificationVisible = true
  }

  closeNotificationPanel(){
    this.isNotificationVisible =false;
  }

  navigateTo(page:'login'|'signup'|'landing'){
    console.log(page);
    
    this.router.navigate([page]);
  }
}
