import { NgModule } from "@angular/core";
import { ListIncomesComponent } from "./components/list-incomes/list-incomes.component";
import { CoreModule } from "../../core/core.module";
import { IncomeRoutingModule } from "./income-routing.module";
import { IncomeService } from "./services/income.service";
import { CommonModule } from "@angular/common";
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient } from "@angular/common/http";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations:[ListIncomesComponent, AddIncomeComponent],
    imports:[
        CoreModule,
        CommonModule,
        IncomeRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers:[provideHttpClient()]
})

export class IncomesModule{}