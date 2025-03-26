import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup

  constructor(private authService:AuthService,private router:Router){
    this.registerForm = new FormGroup({
      username: new FormControl(null,[Validators.required,Validators.pattern(/^\S*$/)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern(/^\S*$/)])
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe(
        (response:any)=>{
          if(response.status==='failed'){
            console.log('User already exists');
          }
          else{
            this.router.navigate(['/login'])
          }
        }
      );
    }
  }

}
