import { Injectable } from "@angular/core";
import { User } from "../models/User.model";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

const serverUrl = 'http://localhost:3000';

@Injectable()

export class AuthService{

    currUser=sessionStorage.getItem('user');
    currUserSub:BehaviorSubject<any> = new BehaviorSubject(this.currUser);
    currUserObs$ = this.currUserSub.asObservable();
    userList:User[]=[];
    redirectAfterLogin:string = '/';
    redirectSub:BehaviorSubject<any> = new BehaviorSubject(this.redirectAfterLogin);
    redirectObs$ = this.redirectSub.asObservable();

    constructor(private http:HttpClient,private router:Router){
        // if(localStorage.getItem('users')===null){
        //     let user:User[] = new Array<User>;
        //     user.push({id:1,email:'user1@gmail.com',username:'user1',password:'123456'}) 
        //     localStorage.setItem('users',JSON.stringify(user));
        // }
        // this.userList=JSON.parse(localStorage.getItem('users') as string);
    }

    setCurrentUser(token:string){
        sessionStorage.setItem('user',token);
        this.currUser = sessionStorage.getItem('user');
        this.currUserSub.next(this.currUser);
    }

    removeCurrentUser(){
        sessionStorage.removeItem('user');
        this.currUser = null;
        this.currUserSub.next(this.currUser);
    }

    setRedirectAfterLogin(path:string){
        this.redirectSub.next(path);
    }

    login(user:any){

        return this.http.post(`${serverUrl}/auth/login`,user,{withCredentials:true});

        // let users:User[] =JSON.parse(localStorage.getItem('users') as string);
        // let filtered = users.filter(x=> x.email===user.email && x.password===user.password);
        // if(filtered.length>0){
        //     this.currUserSub.next(user);
        //     return true;
        // }
        // console.log('Not authorized user');
        
        // return false;
    }

    logOut(){
        this.http.get(`${serverUrl}/auth/logout`).subscribe(
            (response:any)=>{
              if(response.status==='successfull'){
                
              }
            }
        );
        this.removeCurrentUser();
        this.router.navigate(['/login']);
    }

    register(user:any){
        return this.http.post(`${serverUrl}/auth/register`,user,{withCredentials:true});
    }

    changePassword(user:any){
        return this.http.post(`${serverUrl}/auth/changePassword`,user).pipe(
            tap(response=>{
                if(response instanceof HttpResponse){
                    if(response.status ===200){
                        console.log('logout user');
                        
                        this.logOut();
                    }
                }
            })
        );
    }
}