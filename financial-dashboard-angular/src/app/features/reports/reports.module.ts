import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportService } from './services/report.service';
import { ShowReportsComponent } from './components/show-reports/show-reports.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { MonthlyReportsComponent } from './components/monthly-reports/monthly-reports.component';
import { TrendReportsComponent } from './components/trend-reports/trend-reports.component';
import { OtherReportsComponent } from './components/other-reports/other-reports.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    ShowReportsComponent,
    MonthlyReportsComponent,
    TrendReportsComponent,
    OtherReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    SelectModule,
    FormsModule,
    SelectButtonModule,
    ButtonModule,
    ProgressSpinner
  ],
  providers:[
    ReportService,
    provideHttpClient()
  ]
})
export class ReportsModule { }
