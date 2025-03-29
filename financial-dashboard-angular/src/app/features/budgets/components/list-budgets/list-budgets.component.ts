import { Component, OnInit } from '@angular/core';
import { BudgetsService } from '../../services/budgets.service';
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
        let currDate = new Date();
        let month = currDate.getMonth()+1;
        let year = currDate.getFullYear();

        // console.log(month,year);
        
        this.selectDate({month:month,year:year});
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
        this.totalSpendingOfCategory = response.data
        
      }
    )
  }

  deleteBudget(id:number){
    this.budgetService.deleteBudget(id).subscribe(
      (response:any)=>{
        console.log(response.data);
      }
    );
  }

  selectEvent(option:any){
    if(option.operation==='edit'){
      // this.router.navigate(['/editExpense']);
    }
    else if(option.operation==='delete'){
      
      this.deleteBudget(option.id);
    }
  }
}
