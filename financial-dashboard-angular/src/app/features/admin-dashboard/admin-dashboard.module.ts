import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { provideHttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule,
    CardModule,
    SkeletonModule,
    TableModule,
    BadgeModule,
    ButtonModule
  ],
  providers:[provideHttpClient()]
})
export class AdminDashboardModule { }
