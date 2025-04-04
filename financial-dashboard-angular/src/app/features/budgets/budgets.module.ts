import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBudgetsComponent } from './components/list-budgets/list-budgets.component';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { EditBudgetComponent } from './components/edit-budget/edit-budget.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ListBudgetsComponent,
    AddBudgetComponent,
    EditBudgetComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ReactiveFormsModule,
    ProgressBar,
    SharedModule,
    CardModule,
    Dialog,
    ButtonModule,
    ToastModule,
    ConfirmDialog
  ],
  providers:[provideHttpClient(),ConfirmationService, MessageService]
})
export class BudgetsModule { }
