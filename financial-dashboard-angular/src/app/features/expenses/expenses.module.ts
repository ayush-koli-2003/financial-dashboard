import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ListExpensesComponent } from './components/list-expenses/list-expenses.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from './services/expense.service';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    ListExpensesComponent,
    AddExpenseComponent,
    EditExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule,
    SharedModule,
    Dialog,
    ButtonModule,
    ToastModule,
    ConfirmDialog,
    ProgressSpinner
  ],
  providers:[provideHttpClient(),ConfirmationService, MessageService]
})
export class ExpensesModule { }
