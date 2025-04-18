import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './shared/components/register/register.component';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'landing',pathMatch:'full'},
  {path:'dashboard',canActivate:[AuthGuard],loadChildren:()=> import('./features/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'expenses',canActivate:[AuthGuard],loadChildren: ()=> import ('./features/expenses/expenses.module').then(m=>m.ExpensesModule)},
  {path:'incomes',canActivate:[AuthGuard],loadChildren: ()=> import('./features/incomes/income.module').then(m=>m.IncomesModule)},
  {path:'budgets',canActivate:[AuthGuard],loadChildren: ()=> import('./features/budgets/budgets.module').then(m=>m.BudgetsModule)},
  {path:'investments',canActivate:[AuthGuard],loadChildren: ()=> import('./features/investments/investments.module').then(m=>m.InvestmentsModule)},
  {path:'reports',canActivate:[AuthGuard],loadChildren: ()=> import('./features/reports/reports.module').then(m=> m.ReportsModule)},
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegisterComponent},
  {path:'profile',canActivate:[AuthGuard],loadChildren:()=> import('./features/user-profile/user-profile.module').then(m=> m.UserProfileModule)},
  {path:'admin',canActivate:[AuthGuard],loadChildren:()=> import('./features/admin-dashboard/admin-dashboard.module').then(m=> m.AdminDashboardModule)},
  {path:'landing',component:LandingPageComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
