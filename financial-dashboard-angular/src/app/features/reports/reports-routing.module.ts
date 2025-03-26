import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowReportsComponent } from './components/show-reports/show-reports.component';

const routes: Routes = [
  {path:'',component:ShowReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
