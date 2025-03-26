import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInvestmentsComponent } from './components/list-investments/list-investments.component';
import { AddInvestmentComponent } from './components/add-investment/add-investment.component';

const routes: Routes = [
  {path:'',component:ListInvestmentsComponent},
  {path:'addInvestment',component:AddInvestmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
