import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ListBudgetsComponent } from "./components/list-budgets/list-budgets.component";
import { AddBudgetComponent } from "./components/add-budget/add-budget.component";

const routes:Routes=[
    {path:'',component:ListBudgetsComponent},
    {path:'addBudget',component:AddBudgetComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class BudgetRoutingModule{
    
}