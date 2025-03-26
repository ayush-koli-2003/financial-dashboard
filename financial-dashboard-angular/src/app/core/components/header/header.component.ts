import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged:boolean = false;
  constructor(private authService:AuthService,private router:Router){
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
  }

  logOut(){
    this.authService.logOut();
  }
}
