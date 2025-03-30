import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericChartComponent } from './components/generic-chart/generic-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ItemOptionsComponent } from './components/item-options/item-options.component';
import { ButtonModule } from 'primeng/button';
import { GenericAddItemComponent } from './components/generic-add-item/generic-add-item.component';
import { LoadDynamicComponentDirective } from './directives/load-dynamic-component.directive';
import { GenericEditComponent } from './components/generic-edit/generic-edit.component';


@NgModule({
  declarations: [
    GenericChartComponent,
    DatePickerComponent,
    ItemOptionsComponent,
    GenericAddItemComponent,
    LoadDynamicComponentDirective,
    GenericEditComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    DatePicker,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports:[
    GenericChartComponent,
    DatePickerComponent,
    ItemOptionsComponent,
    GenericAddItemComponent,
    LoadDynamicComponentDirective,
    GenericEditComponent
  ],
  providers:[provideCharts(withDefaultRegisterables())]
})
export class SharedModule { }
