import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { ReportService } from '../../services/report.service';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-monthly-reports',
  standalone: false,
  templateUrl: './monthly-reports.component.html',
  styleUrl: './monthly-reports.component.css'
})
export class MonthlyReportsComponent {
  data!: { data: number[]; label: string; }[];
  labels!: string[];
  options!: { scaleShowVerticalLines: boolean; responsive: boolean; };
  legend!: boolean;
  chartType!: ChartType;

  reports:any;

  isLoaded=false;
  budgetVsExpense:any;
  expenseReport:any

  currDate!:{month:string,year:string};
  constructor(private reportService:ReportService, private router:Router){
    // this.data = [
    //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    // ];

    // this.labels = ['2006','2007','2008','2009','2010','2011','2024'];

    // this.options = {
    //   scaleShowVerticalLines: false,
    //   responsive: true
    // };

    // this.legend = true;

    // this.chartType = 'bar';
  }

  ngOnInit(){
    let date = new Date();
    this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
    this.reportService.updateDate(this.currDate);
    this.reportService.currDateObs$.subscribe({
      next:(date:any)=>{
        this.currDate = {month:date.month,year:date.year};
        this.getReports(this.currDate.month,this.currDate.year);
      }
    })
  }

  getReports(month:any,year:any){
    this.reportService.getReports(month,year).subscribe(
      (response:any)=>{
        // this.reports = response.data;
        // console.log(this.reports);
        this.budgetVsExpense = response.data.budgetVsExpense;
        this.expenseReport = response.data.expenseReport;

        console.log(this.budgetVsExpense);
        
        if(this.budgetVsExpense.labels.length !==0 && this.expenseReport.labels.length !==0){
          this.isLoaded =true;
          // console.log('data found');
          
        }
        // console.log(this.budgetVsExpense.data);
      }
    )
  }

  selectDate(date:any){
    this.reportService.updateDate({month:date.month,year:date.year})
  }

  downloadMonthlyReport(){
    this.reportService.currDateObs$.subscribe({
      next:(date:any)=>{
        this.currDate = {month:date.month,year:date.year};
        console.log(this.currDate);
        
        this.reportService.downloadMonthlyReport(this.currDate.month,this.currDate.year).subscribe(
          (blob)=>{
            const url = window.URL.createObjectURL(blob);
            saveAs(blob, 'data.csv');
            window.URL.revokeObjectURL(url)
            
          }
        );
      }
    })
  }
}

