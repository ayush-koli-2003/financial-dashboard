import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-trend-reports',
  standalone: false,
  templateUrl: './trend-reports.component.html',
  styleUrl: './trend-reports.component.css'
})
export class TrendReportsComponent implements OnInit{
  currDate!:{month:string,year:string};
  incomeVsExpenseTrend:any;
  savingsTrend:any
  pastMonths = '3'
  months = ['3']; // ,'6','12'
  constructor(private reportService:ReportService){

  }
  ngOnInit(): void {
    let date = new Date();
    this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
    this.reportService.updateDate(this.currDate);
    this.reportService.currDateObs$.subscribe({
      next:(date:any)=>{
        this.currDate = {month:date.month,year:date.year};
        this.getTrendReports(this.currDate.month,this.currDate.year,this.pastMonths);
      }
    })
  }

  getTrendReports(month:any,year:any,pastMonths:any){
    this.reportService.getTrendReports(month,year,pastMonths).subscribe({
      next:(res:any)=>{
        
        this.savingsTrend=res.data.savingsTrend;
        this.incomeVsExpenseTrend = res.data.incomeVsExpenseTrend;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  monthSelected(){
    // console.log(this.pastMonths);
    
    this.getTrendReports(this.currDate.month,this.currDate.year,this.pastMonths);
  }
}
