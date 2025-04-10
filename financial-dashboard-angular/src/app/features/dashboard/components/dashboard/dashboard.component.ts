import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  totalExpense:number = 0;
  totalBudget:number = 0;
  totalIncome:number = 0;
  totalInvestment:number = 0;
  isDataLoaded = false;
  isTransactionsLoaded=false;
  currDate!:{month:string,year:string};

  isChartsLoaded=false;

  charts:any[]=[]

  transactions:any[]=[1,2,3,4,5,6,7,8,9,10];
  
  constructor(private dashboardService:DashboardService,private router:Router){

  }

  ngOnInit(){
    // this.getDashboardData(this.month,this.year);
    let date = new Date();
    this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
    this.dashboardService.updateDate(this.currDate);
    this.dashboardService.currDateObs$.subscribe({
      next:(date:any)=>{
        this.currDate = {month:date.month,year:date.year};
        this.getDashboardData(this.currDate.month,this.currDate.year);
        this.getDashboardCharts(this.currDate.month,this.currDate.year);
      }
    })
  }

  // this.month=data.month;
  // this.year=data.year;
  // console.log(this.month,this.year);
  
  // this.getDashboardData(this.month,this.year);
  // this.getDashboardCharts(this.month,this.year);


  getDashboardData(month:any,year:any){
    this.dashboardService.getDashboardData(month,year).subscribe({
      next:(res:any)=>{
        this.isDataLoaded = true;
        this.totalExpense = res.data.totalExpenseByDate;
        this.totalBudget = res.data.totalBudgetByDate;
        this.totalIncome = res.data.totalIncomeByDate;
        this.totalInvestment = res.data.totalInvestmentByDate;
        // console.log(res.data);
      }
    })

    this.dashboardService.getDashboardTransactions(month,year).subscribe({
      next:(res:any)=>{
        this.isTransactionsLoaded = true;
        this.transactions = res.data;
        
      }
    })

    // IMP - transactions- Date, Type, Name, Category, Amount, Note. (Pagination to only show last 10)

  }

  getDashboardCharts(month:any,year:any){
    this.charts=[];
    let isReportLoaded=false;
    let isTrendreportLoaded=false;
    this.dashboardService.getReports(month,year).subscribe(
      (res:any)=>{
        this.charts.push(res.data.budgetVsExpense);
        this.charts.push(res.data.expenseReport);
        isReportLoaded = true;

        this.isChartsLoaded = isReportLoaded&&isTrendreportLoaded;
      }
    )

    this.dashboardService.getTrendReports(month,year,3).subscribe(
      (res:any)=>{
        this.charts.push(res.data.savingsTrend);
        this.charts.push(res.data.incomeVsExpenseTrend);
        isTrendreportLoaded = true;
        this.isChartsLoaded = isReportLoaded&&isTrendreportLoaded;
      }
    )
  }

  selectDate(data:any){
    // console.log(data);
    this.dashboardService.updateDate({month:data.month,year:data.year})
  }

  navigateTo(){
    this.router.navigate(['/reports'])
  }
}
