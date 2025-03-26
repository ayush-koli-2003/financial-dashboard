import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportService } from './services/report.service';
import { ShowReportsComponent } from './components/show-reports/show-reports.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    ShowReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ],
  providers:[
    ReportService,
    provideHttpClient()
  ]
})
export class ReportsModule { }
