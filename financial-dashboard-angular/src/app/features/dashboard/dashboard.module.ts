import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
  
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    SharedModule,
    DashboardRoutingModule,
    TableModule, 
    ButtonModule,
    BadgeModule,
    CardModule
  ],
  providers:[provideHttpClient()]
})
export class DashboardModule { }
