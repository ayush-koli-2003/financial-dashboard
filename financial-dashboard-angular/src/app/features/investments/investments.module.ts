import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRoutingModule } from './investments-routing.module';
import { ListInvestmentsComponent } from './components/list-investments/list-investments.component';
import { AddInvestmentComponent } from './components/add-investment/add-investment.component';
import { InvestmentService } from './services/investment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';


@NgModule({
  declarations: [
    ListInvestmentsComponent,
    AddInvestmentComponent
  ],
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule,
    Dialog
  ],
  providers:[provideHttpClient()]
})
export class InvestmentsModule { }
