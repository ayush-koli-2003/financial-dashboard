import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ChartType } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-reports',
  standalone: false,
  templateUrl: './show-reports.component.html',
  styleUrl: './show-reports.component.css'
})
export class ShowReportsComponent {
  data!: { data: number[]; label: string; }[];
  labels!: string[];
  options!: { scaleShowVerticalLines: boolean; responsive: boolean; };
  legend!: boolean;
  chartType!: ChartType;

  reportOptions = [
    {label:'Monthly',value:'monthly'},
    {label:'Trends',value:'trends'},
    // {label:'Others',value:'others'}
  ]

  reports:any;
  selectedReport:any= {label:'Monthly',value:'monthly'}

  isLoaded=false;
  budgetVsExpense:any;
  expenseReport:any

  month:any;
  year:any;
  constructor(private reportService:ReportService, private router:Router,private route:ActivatedRoute){
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
    // let date = new Date();
    // this.month = date.getMonth()+1;
    // this.year = date.getFullYear();
    // this.getReports(this.month,this.year);

    this.router.navigate(['monthly'],{relativeTo:this.route})
  }

  getReports(month:any,year:any){
    this.reportService.getReports(month,year).subscribe(
      (response:any)=>{
        // this.reports = response.data;
        // console.log(this.reports);
        this.budgetVsExpense = response.data.budgetVsExpense;
        this.expenseReport = response.data.expenseReport;

        // console.log(this.budgetVsExpense.labels.length);
        
        if(this.budgetVsExpense.labels.length !==0 && this.expenseReport.labels.length !==0){
          this.isLoaded =true;
          console.log('data found');
          
        }
        // console.log(this.budgetVsExpense.data);
      }
    )
  }

  navigate(){
    // console.log(this.selectedReport);
    
    this.router.navigate([this.selectedReport],{relativeTo:this.route})
  }

  selectDate(date:any){
    this.getReports(date.month,date.year);
  }
}
