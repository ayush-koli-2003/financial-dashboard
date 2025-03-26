import { Component, OnInit } from '@angular/core';
import { BudgetsService } from '../../services/budgets.service';
import { ExpenseCategory } from '../../../../core/enums/expense-category.enum';
import { Budget } from '../../../../core/models/Budget.model';

@Component({
  selector: 'app-list-budgets',
  standalone: false,
  templateUrl: './list-budgets.component.html',
  styleUrl: './list-budgets.component.css'
})
export class ListBudgetsComponent implements OnInit{
  budgetList:Budget[];
  month:any = '3';
  year:any = '';
  constructor(private budgetService:BudgetsService){
    this.budgetList=[];
  }

  ngOnInit(): void {
    this.budgetService.updateBudgetObs$.subscribe(
      ()=>{
        this.getExpenses(this.month,this.year) 
      }
    )
  }

  getExpenses(month:any,year:any){
    this.budgetService.getBudgets(month,year).subscribe(
      (response:any)=>{
        this.budgetList = response.data;
      }
    );
  }

  selectDate(date:any){
    this.getExpenses(date.month,date.year);
  }
}
