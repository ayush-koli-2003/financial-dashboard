import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-trend-reports',
  standalone: false,
  templateUrl: './trend-reports.component.html',
  styleUrl: './trend-reports.component.css'
})
export class TrendReportsComponent implements OnInit{
  month:any = '4'
  year:any = '2025'
  incomeVsExpenseTrend:any;
  savingsTrend:any
  pastMonths = '6'
  months = ['3','6','12'];
  constructor(private reportService:ReportService){

  }
  ngOnInit(): void {
    this.getTrendReports(this.month,this.year,this.pastMonths);
  }

  getTrendReports(month:any,year:any,pastMonths:any){
    this.reportService.getTrendReports(month,year,pastMonths).subscribe({
      next:(res:any)=>{
        
        this.savingsTrend=res.data.savingsTrend;
        this.incomeVsExpenseTrend = res.data.incomeVsExpenseTrend;
      }
    })
  }

  monthSelected(){
    // console.log(this.pastMonths);
    
    this.getTrendReports(this.month,this.year,this.pastMonths);
  }
}
