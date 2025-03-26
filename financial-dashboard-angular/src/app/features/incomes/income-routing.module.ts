import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListIncomesComponent } from "./components/list-incomes/list-incomes.component";
import { AddIncomeComponent } from "./components/add-income/add-income.component";

const routes:Routes=[
    {path:'',component:ListIncomesComponent},
    // {path:'addIncome',component:AddIncomeComponent}
    {path:'addIncome',component:AddIncomeComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class IncomeRoutingModule{
    
}