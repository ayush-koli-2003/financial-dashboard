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
import { Dialog } from 'primeng/dialog';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { FilterOptionsComponent } from './components/filter-options/filter-options.component';
import { SelectModule } from 'primeng/select';
import { DisplayTransactionComponent } from './components/display-transaction/display-transaction.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { HeaderComponent } from './components/header/header.component';
import { Menu } from 'primeng/menu';
import { Menubar } from 'primeng/menubar';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Skeleton } from 'primeng/skeleton';
import { GenericDisplayDetailsComponent } from './components/generic-display-details/generic-display-details.component';
import { TextareaModule } from 'primeng/textarea';
import { DrawerModule } from 'primeng/drawer';
import { NotificationsPanelComponent } from './components/notifications-panel/notifications-panel.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { InputOtpModule } from 'primeng/inputotp';


@NgModule({
  declarations: [
    GenericChartComponent,
    DatePickerComponent,
    ItemOptionsComponent,
    GenericAddItemComponent,
    LoadDynamicComponentDirective,
    GenericEditComponent,
    GenericFormComponent,
    FilterOptionsComponent,
    DisplayTransactionComponent,
    GenericTableComponent,
    HeaderComponent,
    GenericDisplayDetailsComponent,
    NotificationsPanelComponent,
    OtpVerificationComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    DatePicker,
    ButtonModule,
    ReactiveFormsModule,
    Dialog,
    SelectModule,
    Menu,
    Ripple,
    Menubar,
    AvatarModule,
    TableModule,
    TagModule,
    Skeleton,
    TextareaModule,
    DrawerModule,
    FloatLabelModule,
    InputOtpModule
  ],
  exports:[
    GenericChartComponent,
    DatePickerComponent,
    ItemOptionsComponent,
    GenericAddItemComponent,
    LoadDynamicComponentDirective,
    GenericFormComponent,
    GenericEditComponent,
    FilterOptionsComponent,
    HeaderComponent,
    GenericTableComponent,
    OtpVerificationComponent
  ],
  providers:[provideCharts(withDefaultRegisterables())]
})
export class SharedModule { }
