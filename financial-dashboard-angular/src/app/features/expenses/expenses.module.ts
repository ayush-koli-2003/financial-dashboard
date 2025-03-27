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


@NgModule({
  declarations: [
    ListExpensesComponent,
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule
  ],
  providers:[provideHttpClient()]
})
export class ExpensesModule { }
