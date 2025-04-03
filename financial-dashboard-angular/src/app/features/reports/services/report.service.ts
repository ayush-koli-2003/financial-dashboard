import { Injectable } from "@angular/core";
import { ExpenseService } from "../../expenses/services/expense.service";
import { BudgetsService } from "../../budgets/services/budgets.service";
import { IncomeService } from "../../incomes/services/income.service";
import { InvestmentService } from "../../investments/services/investment.service";
import { Expense } from "../../../core/models/Expense.model";
import { Budget } from "../../../core/models/Budget.model";
import { Income } from "../../../core/models/Income.model";
import { Investment } from "../../../core/models/Investment.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class ReportService{
    expenseList:Expense[]=[];
    budgetList:Budget[]=[];
    incomeList:Income[]=[];
    investmentList:Investment[]=[];
    constructor(private http: HttpClient,private expenseService:ExpenseService,private budgetService:BudgetsService,private incomeService:IncomeService,private investmentService:InvestmentService){
        // this.expenseService.expenseListObs$.subscribe(
        //     (expenses)=>{
        //         this.expenseList = expenses;
        //     }
        // )

        // this.budgetService.budgetObs$.subscribe(
        //     (budgets)=>{
        //         this.budgetList = budgets;
        //     }
        // )

        // this.incomeService.incomeListObs$.subscribe(
        //     (incomes)=>{
        //         this.incomeList = incomes;
        //     }
        // )

        // this.investmentService.investementListObs$.subscribe(
        //     (investments)=>{
        //         this.investmentList = investments;
        //     }
        // )
    }

    getReports(month:any,year:any){
        const params = `month=${month}&year=${year}`;
        return this.http.get(`http://localhost:3000/api/report/monthly?${params}`,{withCredentials:true});
    }

    getTrendReports(month:any,year:any,pastMonths:any){
        const params = `month=${month}&year=${year}&pastMonths=${pastMonths}`;
        return this.http.get(`http://localhost:3000/api/report/trends?${params}`,{withCredentials:true});
    }
}