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
  constructor(private reportService:ReportService){

  }
  ngOnInit(): void {
    this.reportService.getTrendReports(this.month,this.year).subscribe({
      next:(res:any)=>{
        
        this.savingsTrend=res.data.savingsTrend;
        this.incomeVsExpenseTrend = res.data.incomeVsExpenseTrend;
      }
    })
  }
}
