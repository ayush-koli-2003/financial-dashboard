import { NgModule } from "@angular/core";
import { ListIncomesComponent } from "./components/list-incomes/list-incomes.component";
import { CoreModule } from "../../core/core.module";
import { IncomeRoutingModule } from "./income-routing.module";
import { CommonModule } from "@angular/common";
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient } from "@angular/common/http";
import { SharedModule } from "../../shared/shared.module";
import { CardModule } from "primeng/card";
import { Dialog } from "primeng/dialog";
import { EditIncomeComponent } from './components/edit-income/edit-income.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
@NgModule({
    declarations:[ListIncomesComponent, AddIncomeComponent, EditIncomeComponent],
    imports:[
        CoreModule,
        CommonModule,
        IncomeRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        CardModule,
        Dialog,
        ConfirmDialog,
        ToastModule,
        ProgressSpinner
    ],
    providers:[provideHttpClient(),MessageService,ConfirmationService]
})

export class IncomesModule{}