import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../../../core/models/Expense.model';
import { Router } from '@angular/router';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';

@Component({
  selector: 'app-list-expenses',
  standalone: false,
  templateUrl: './list-expenses.component.html',
  styleUrl: './list-expenses.component.css'
})
export class ListExpensesComponent implements OnInit, AfterViewInit {
  expenseList:Expense[]=[];
  month:any;
  year:any;

  isAddOpen = false;

  isEditOpen = false;

  isDialogVisible = false;
  dialogLabel:string='';

  editId!:number;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponent!:LoadDynamicComponentDirective;
  compRef!:ComponentRef<any>;
  vcr:any;
  constructor(private expenseService:ExpenseService, private router:Router){
  }

  ngOnInit(): void {
    let date = new Date();
    this.month = date.getMonth()+1;
    this.year = date.getFullYear();
    this.expenseService.updateExpenseList$.subscribe(()=>{
      this.getExpenses(this.month,this.year)
    })

  }

  ngAfterViewInit(): void {
    this.vcr = this.loadDynamicComponent.vcr;
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
      this.editId = option.data;
      // console.log(this.editId);
      this.dialogLabel = 'Edit Expense'
      this.isEditOpen = true;
      // console.log(this.isEditOpen);
      this.openDialogue('edit',this.editId);
      
    }
    else if(option.operation==='delete'){
      // console.log(option.id);
      this.deleteExpense(option.data);
      
    }
  }

  loadAddComponent() {
    
    this.vcr.clear();
    this.compRef = this.loadDynamicComponent.vcr.createComponent(AddExpenseComponent);
  
    this.compRef.instance.closeEvent.subscribe(
      (res: any) => {
        console.log(res);
        
        this.closeDialogue();
      }
    );
  }

  loadEditComponent(editId:any) {
    
    this.vcr.clear();
    this.compRef = this.loadDynamicComponent.vcr.createComponent(EditExpenseComponent);
    this.compRef.setInput('id',editId);
  
    this.compRef.instance.closeEvent.subscribe(
      (res: any) => {
        console.log(res);
        
        this.closeDialogue();
      }
    );
  }

  openDialogue(value:'add'|'edit',editId?:number){
    this.isDialogVisible = true;

    if(value==='add'){
      this.loadAddComponent();
      this.dialogLabel = 'Add Expense'
    }
    else{
      this.loadEditComponent(editId);
    }
  }
  
  closeDialogue() {
    this.isDialogVisible = false;
    if (this.vcr) {
      this.vcr.clear();
    }
  }

  selectDate(data:any){
    // console.log(data); 
    
    this.getExpenses(data.month,data.year);
  }
}
