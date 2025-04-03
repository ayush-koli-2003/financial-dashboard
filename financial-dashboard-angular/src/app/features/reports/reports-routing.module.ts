import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowReportsComponent } from './components/show-reports/show-reports.component';
import { MonthlyReportsComponent } from './components/monthly-reports/monthly-reports.component';
import { TrendReportsComponent } from './components/trend-reports/trend-reports.component';
import { OtherReportsComponent } from './components/other-reports/other-reports.component';

const routes: Routes = [
  {path:'',component:ShowReportsComponent,children:[
    {path:'monthly',component:MonthlyReportsComponent},
    {path:'trends',component:TrendReportsComponent},
    {path:'others',component:OtherReportsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
