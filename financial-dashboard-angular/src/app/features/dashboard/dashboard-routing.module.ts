import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes:Routes = [
    {path:'',component:DashboardComponent,pathMatch:"full"}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class DashboardRoutingModule {
    
}