import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../../../core/models/Expense.model';
import { Router } from '@angular/router';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Component({
  selector: 'app-list-expenses',
  standalone: false,
  templateUrl: './list-expenses.component.html',
  styleUrl: './list-expenses.component.css'
})
export class ListExpensesComponent implements OnInit, AfterViewInit {
  expenseList:Expense[]=[];
  month:any = '3';
  year:any = '';

  isAddOpen = false;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponent!:LoadDynamicComponentDirective;
  comRef!:ComponentRef<any>;
  vcr:any;
  constructor(private expenseService:ExpenseService, private router:Router){
  }

  ngOnInit(): void {
    this.expenseService.updateExpenseList$.subscribe(()=>{
      this.getExpenses(this.month,this.year)
    })

  }

  ngAfterViewInit(): void {
  }

  getExpenses(month:any,year:any){
    this.expenseService.getExpenseList(month,year).subscribe(
      (response:any)=>{
        this.expenseList = response.data;
        
      }
    )
  }

  deleteExpense(id:any){
    this.expenseService.deleteExpense(id).subscribe(
      (response:any)=>{
        console.log(response.data);
        
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  selectEvent(option:any){
    if(option.operation==='edit'){
      // this.router.navigate(['/editExpense']);
    }
    else if(option.operation==='delete'){
      // console.log(option.id);
      this.deleteExpense(option.data);
      
    }
  }

  loadAddComponent(){
    this.isAddOpen != this.isAddOpen;
    this.loadDynamicComponent.vcr.clear();
    this.comRef = this.loadDynamicComponent.vcr.createComponent(AddExpenseComponent);

    this.comRef.instance.closeEvent.subscribe(
      (res:any)=>{
        this.comRef.destroy();
        this.getExpenses(this.month,this.year);
      }
    )
    
  }

  selectDate(data:any){
    // console.log(data); 
    
    this.getExpenses(data.month,data.year);
  }
}
