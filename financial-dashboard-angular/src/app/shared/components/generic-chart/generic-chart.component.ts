import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType, ChartTypeRegistry } from 'chart.js';


@Component({
  selector: 'app-generic-chart',
  standalone: false,
  templateUrl: './generic-chart.component.html',
  styleUrl: './generic-chart.component.css'
})
export class GenericChartComponent implements OnChanges, OnInit {
  @Input() data: any[] = [];
  @Input() labels: any[] = [];
  @Input() options: any;
  @Input() legend: boolean = false;
  @Input() chartType!: ChartType;
  
  chartOptions: any;

  ngOnInit() {
    this.setDefaultOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['chartType']) {
      this.setDefaultOptions();
    }
  }

  isPieOrDoughnut(): boolean {
    return this.chartType === 'pie' || this.chartType === 'doughnut';
  }

  isBarChart(): boolean {
    return this.chartType === 'bar';
  }

  isLineChart(): boolean {
    return this.chartType === 'line';
  }

  private setDefaultOptions(): void {
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    
    if (this.isPieOrDoughnut()) {
      const pieOptions = {
        ...defaultOptions,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      };
      this.chartOptions = this.options ? { ...pieOptions, ...this.options } : pieOptions;
    } 
    else if (this.isBarChart()) {
      const barOptions = {
        ...defaultOptions,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
      this.chartOptions = this.options ? { ...barOptions, ...this.options } : barOptions;
    }
    else if (this.isLineChart()) {
      const lineOptions = {
        ...defaultOptions,
        elements: {
          line: {
            tension: 0.4
          }
        }
      };
      this.chartOptions = this.options ? { ...lineOptions, ...this.options } : lineOptions;
    }
    else {
      this.chartOptions = this.options ? { ...defaultOptions, ...this.options } : defaultOptions;
    }
  }
}
