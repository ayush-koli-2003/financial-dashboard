import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/User.model';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  isDataLoaded = false;
  transactions=[];
  isTransactionsLoaded = false;
  userList!:User[];
  totalUsers!:number;
  totalActiveUsers!:number;
  totalTransactions!:number;

  constructor(private adminService:AdminDashboardService){

  }

  ngOnInit(){
    
    this.adminService.userListSub.subscribe(
      (res:any)=>{
        this.getData();
        this.getUsers();
      }
    )
    
  }

  getData(){
    this.adminService.getAdminDashboardData('4','2025').subscribe(
      (res:any)=>{
        this.totalUsers = res.data.totalUsers;
        this.totalActiveUsers = res.data.totalActiveUsers
        this.totalTransactions = res.data.totalTransactions;
        this.isDataLoaded = true;
        // console.log(res.data);
        
      }
    )
  }

  getUsers(){
    this.adminService.getAllUsers().subscribe(
      (res:any)=>{
        this.userList = res.data;
        console.log(res.data);
        this.isTransactionsLoaded = true;
      }
    )
  }
  
  changeStatus(id:number){
    this.adminService.changeStatus(id).subscribe(()=>{
      console.log('status changed');
      
    });
  }
}
