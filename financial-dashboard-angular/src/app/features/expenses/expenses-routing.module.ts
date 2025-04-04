import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListExpensesComponent } from './components/list-expenses/list-expenses.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';

const routes: Routes = [
  {path:'',component:ListExpensesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
