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
    ButtonModule
  ],
  providers:[provideHttpClient()]
})
export class ExpensesModule { }
