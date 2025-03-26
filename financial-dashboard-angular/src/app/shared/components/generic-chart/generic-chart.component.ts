import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType, ChartTypeRegistry } from 'chart.js';


@Component({
  selector: 'app-generic-chart',
  standalone: false,
  templateUrl: './generic-chart.component.html',
  styleUrl: './generic-chart.component.css'
})
export class GenericChartComponent implements OnChanges{
  @Input() data:any[]=[];
  @Input() labels:any[]=[];
  @Input() options:any;
  @Input() legend:boolean=false;
  @Input() chartType!:ChartType;

  ngOnInit(){
    
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
