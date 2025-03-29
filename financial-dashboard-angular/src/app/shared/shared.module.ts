import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericChartComponent } from './components/generic-chart/generic-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ItemOptionsComponent } from './components/item-options/item-options.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    GenericChartComponent,
    DatePickerComponent,
    ItemOptionsComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    DatePicker,
    ButtonModule
  ],
  exports:[
    GenericChartComponent,
    DatePickerComponent,
    ItemOptionsComponent
  ],
  providers:[provideCharts(withDefaultRegisterables())]
})
export class SharedModule { }
