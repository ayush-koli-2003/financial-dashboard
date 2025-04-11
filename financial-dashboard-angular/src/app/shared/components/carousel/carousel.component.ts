import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnChanges {
  @Input() charts!:any[];
  chart:any;
  isChartsLoaded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['charts']){
      
      let index = 0;
      this.runInterval(index)
      
    }
  }

  runInterval(index:number){
    this.isChartsLoaded = true;
      
    this.chart = this.charts[index];
    setInterval(()=>{
      index= (index+1)%(this.charts.length);
      this.chart = this.charts[index];
      
    },3000)
  }
}
