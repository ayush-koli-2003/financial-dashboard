import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBudgetsComponent } from './components/list-budgets/list-budgets.component';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ListBudgetsComponent,
    AddBudgetComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ReactiveFormsModule,
    ProgressBar,
    SharedModule
  ],
  providers:[provideHttpClient()]
})
export class BudgetsModule { }
