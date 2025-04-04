import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../../../core/models/Expense.model';
import { Router } from '@angular/router';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { DisplayTransactionComponent } from '../../../../shared/components/display-transaction/display-transaction.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-expenses',
  standalone: false,
  templateUrl: './list-expenses.component.html',
  styleUrl: './list-expenses.component.css'
})
export class ListExpensesComponent implements OnInit, AfterViewInit {
  expenseList:Expense[]=[];
  unfilteredList:any[]=[];
  month:any;
  year:any;
  categories:any[]=[];

  isAddOpen = false;

  isEditOpen = false;

  isDialogVisible = false;
  dialogLabel:string='';

  editId!:number;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponent!:LoadDynamicComponentDirective;
  compRef!:ComponentRef<any>;
  vcr:any;
  constructor(private expenseService:ExpenseService, private router:Router,private confirmationService: ConfirmationService, private messageService: MessageService){
  }

  ngOnInit(): void {
    let date = new Date();
    this.month = date.getMonth()+1;
    this.year = date.getFullYear();
    this.expenseService.updateExpenseList$.subscribe(()=>{
      this.getExpenses(this.month,this.year);
      this.getExpenseCategories();
    })

  }

  ngAfterViewInit(): void {
    this.vcr = this.loadDynamicComponent.vcr;
  }

  takeFilters(filters:any){
    // console.log(filters);
    this.expenseList = this.unfilteredList
    if(filters.sortBy || filters.filterBy){
      this.applyFilters(filters.sortBy,filters.filterBy)
    }
  }

  getExpenses(month:any,year:any){
    this.expenseService.getExpenseList(month,year).subscribe(
      (response:any)=>{
        this.expenseList = response.data;
        this.unfilteredList = this.expenseList;
      }
    )
  }

  getExpenseCategories(){
    this.expenseService.getExpenseCategories().subscribe({
      next:(res:any)=>{
        this.categories = res.data;
        // console.log(this.categories);
        
      }
    })
  }

  applyFilters(sortByValue:any,filterByValue:any){
    this.expenseList = this.unfilteredList.filter(e=> filterByValue !== undefined ? e.category===filterByValue: true)
      .sort((a,b)=> sortByValue===undefined ? 0 : sortByValue==='Low to High' ? a.amount-b.amount:b.amount-a.amount)
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
      this.confirmationService.confirm({
        message: 'Do you want to delete this Expense?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
            this.messageService.add({ severity: 'error', summary: 'Confirmed', detail: 'Expense deleted' });
            this.deleteExpense(option.data);
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
        },
      });

      
      
    }
  }

  loadAddComponent() {
    
    this.vcr.clear();
    this.compRef = this.loadDynamicComponent.vcr.createComponent(AddExpenseComponent);
  
    this.compRef.instance.closeEvent.subscribe(
      (res: any) => {
        console.log(res);
        
        this.closeDialogue();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense added' });
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

  loadDisplayComponent(value:any){
    this.vcr.clear();
    this.compRef = this.loadDynamicComponent.vcr.createComponent(DisplayTransactionComponent);
    this.compRef.setInput('data',value)
  }

  openDisplay(value:any){
    this.isDialogVisible = true;
    this.dialogLabel = value.category;
    this.loadDisplayComponent(value);
  }
}
