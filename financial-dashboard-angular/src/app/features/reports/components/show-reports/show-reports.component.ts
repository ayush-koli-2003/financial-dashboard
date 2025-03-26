import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ChartType } from 'chart.js';

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

  reports:any

  month:any = '3';
  year:any = '';
  constructor(private reportService:ReportService){
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
    this.reportService.getReports(this.month,this.year).subscribe(
      (response:any)=>{
        this.reports = response.data;
        console.log(this.reports);
      }
    )
  }
}
