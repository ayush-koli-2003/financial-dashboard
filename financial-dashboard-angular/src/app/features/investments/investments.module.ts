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
import { EditInvestmentComponent } from './components/edit-investment/edit-investment.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    ListInvestmentsComponent,
    AddInvestmentComponent,
    EditInvestmentComponent
  ],
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule,
    Dialog,
    ConfirmDialog,
    ToastModule,
    ProgressSpinner
  ],
  providers:[provideHttpClient(),MessageService,ConfirmationService]
})
export class InvestmentsModule { }
