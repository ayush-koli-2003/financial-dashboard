import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './core/components/register/register.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuard],loadChildren: ()=> import ('./features/expenses/expenses.module').then(m=>m.ExpensesModule)},
  {path:'incomes',canActivate:[AuthGuard],loadChildren: ()=> import('./features/incomes/income.module').then(m=>m.IncomesModule)},
  {path:'budgets',canActivate:[AuthGuard],loadChildren: ()=> import('./features/budgets/budgets.module').then(m=>m.BudgetsModule)},
  {path:'investments',canActivate:[AuthGuard],loadChildren: ()=> import('./features/investments/investments.module').then(m=>m.InvestmentsModule)},
  {path:'reports',canActivate:[AuthGuard],loadChildren: ()=> import('./features/reports/reports.module').then(m=> m.ReportsModule)},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
