import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericChartComponent } from './components/generic-chart/generic-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { DatePickerComponent } from './components/date-picker/date-picker.component';


@NgModule({
  declarations: [
    GenericChartComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    DatePicker
  ],
  exports:[GenericChartComponent, DatePickerComponent],
  providers:[provideCharts(withDefaultRegisterables())]
})
export class SharedModule { }
