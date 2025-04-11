import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;
  isClicked = false;

  loginError!: string;

  constructor(private authService:AuthService,private router:Router){
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern(/^\S*$/)])
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        (response:any)=>{
          if(response.status==='successfull'){
              this.authService.setCurrentUser(response.data);
              let path;
              this.authService.redirectObs$.subscribe(
                (url)=>{
                  path = url;
                }
              )
          }
          else{
            console.log('Login failed');
          }            
        }
      );
    }
  }
}
