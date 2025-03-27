import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../../../core/models/Expense.model';

@Component({
  selector: 'app-list-expenses',
  standalone: false,
  templateUrl: './list-expenses.component.html',
  styleUrl: './list-expenses.component.css'
})
export class ListExpensesComponent implements OnInit {
  expenseList:Expense[]=[];
  month:any = '3';
  year:any = '';
  constructor(private expenseService:ExpenseService){
  }

  ngOnInit(): void {
    this.expenseService.updateExpenseList$.subscribe(()=>{
      this.getExpenses(this.month,this.year)
    })

  }

  getExpenses(month:any,year:any){
    this.expenseService.getExpenseList(month,year).subscribe(
      (response:any)=>{
        this.expenseList = response.data;
        
      }
    )
  }



  selectDate(data:any){
    // console.log(data); 
    
    this.getExpenses(data.month,data.year);
  }
}
