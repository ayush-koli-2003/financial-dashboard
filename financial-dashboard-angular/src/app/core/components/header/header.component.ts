import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged:boolean = false;
  profileItems: MenuItem[] | undefined;
  items:MenuItem[] | undefined
  constructor(private authService:AuthService,private router:Router){
    
  }

  ngOnInit(){
    this.authService.currUserObs$.subscribe(
      (user)=>{
        if(user===null){
          this.isLogged = false;
          
        }
        else{
          this.isLogged = true;
        }
      }
    )

    this.items = [
      {
        label: 'Dashboard',
        command:()=>{
          this.router.navigate([''])
        }
      },
      {
        label: 'Expense',
        command:()=>{
          this.router.navigate(['/expenses'])
        }
      },
      {
        label: 'Budget',
        command:()=>{
          this.router.navigate(['/budgets'])
        }
      },
      {
        label: 'Income',
        command:()=>{
          this.router.navigate(['/incomes'])
        }
      },
      {
        label: 'Investment',
        command:()=>{
          this.router.navigate(['/investments'])
        }
      },
      {
        label: 'Report',
        command:()=>{
          this.router.navigate(['/reports'])
        }
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
              }
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

  logOut(){
    this.authService.logOut();
  }
}
