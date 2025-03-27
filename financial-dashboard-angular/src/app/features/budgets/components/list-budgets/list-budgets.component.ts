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
  isLoaded = false;
  totalSpendingOfCategory:any[]=[];
  constructor(private budgetService:BudgetsService){
    this.budgetList=[];
  }

  ngOnInit(): void {
    this.budgetService.updateBudgetObs$.subscribe(
      ()=>{
        this.getBudgets(this.month,this.year);
        this.getTotalExpenseByCategory(this.month,this.year);
      }
    )
  }

  getBudgets(month:any,year:any){
    this.budgetService.getBudgets(month,year).subscribe(
      (response:any)=>{
        this.budgetList = response.data;
        this.isLoaded = true;
      }
    );
  }

  selectDate(date:any){
    this.getBudgets(date.month,date.year);
    this.getTotalExpenseByCategory(date.month,date.year);
  }

  getTotalExpenseByCategory(month:any,year:any){
    this.budgetService.getTotalSpendingOfCategory(month,year).subscribe(
      (response:any)=>{
        this.totalSpendingOfCategory = response.data;
        console.log(this.totalSpendingOfCategory);
      }
    )
  }
}
