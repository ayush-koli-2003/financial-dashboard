import { AfterViewChecked, AfterViewInit, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { BudgetsService } from '../../services/budgets.service';
import { Budget } from '../../../../core/models/Budget.model';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExpenseCategory } from '../../../../core/enums/expense-category.enum';
import { IncomeCategory } from '../../../../core/enums/income-category.enum';
import { InvestmentCategory } from '../../../../core/enums/investment-category.enum';
import { Router } from '@angular/router';
import { GenericDisplayDetailsComponent } from '../../../../shared/components/generic-display-details/generic-display-details.component';
import { CurrentDateService } from '../../../../core/services/current-date.service';

@Component({
  selector: 'app-list-budgets',
  standalone: false,
  templateUrl: './list-budgets.component.html',
  styleUrl: './list-budgets.component.css'
})
export class ListBudgetsComponent implements OnInit, AfterViewChecked{
  budgetList:Budget[];
  isLoaded = false;
  isAddOpen = false;
  totalSpendingOfCategory:any[]=[];
  currDate!:{month:string,year:string};

  isEditOpen = false;
  isDialogVisible = false;
  dialogLabel:string='';
  editId!:number;
  categories:any[]=[];
  unFilteredList:any[]=[];
  budgetLength!:number;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponentDirective!:LoadDynamicComponentDirective;
  vcr!:any;
  compRef!:ComponentRef<any>;
  constructor(private currentDateService:CurrentDateService,private router:Router,private budgetService:BudgetsService,private confirmationService: ConfirmationService, private messageService: MessageService){
    this.budgetList=[];
    
  }

  ngOnInit(): void {
    let date = new Date();
    this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};

    this.budgetService.updateDate(this.currDate);
    this.budgetService.updateBudgetObs$.subscribe(
      ()=>{
        console.log('get data');
        let date = this.budgetService.getDate();
        // this.month = date.month;
        // this.year = date.year;
        this.currDate= {month:date.month,year:date.year};
        console.log(this.currDate);        
        
        this.getExpenseCategories();
        // console.log(month,year);
        this.getBudgets(this.currDate.month,this.currDate.year);
        this.getTotalExpenseByCategory(this.currDate.month,this.currDate.year);
      }
    )
  }

  ngAfterViewChecked(): void {
    if(this.loadDynamicComponentDirective){
      this.vcr = this.loadDynamicComponentDirective.vcr;
    }
  }

  getExpenseCategories(){
    this.budgetService.getAllCategories().subscribe({
      next:(res:any)=>{
        this.categories = res.data;
        // console.log(this.categories);
      }
    })
  }

  takeFilters(filters:any){
    console.log(filters);
    this.totalSpendingOfCategory = this.unFilteredList;
    this.budgetLength = this.budgetList.length;
    if(filters.sortBy || filters.filterBy){
      this.applyFilters(filters.sortBy,filters.filterBy)
    }
  }

  applyFilters(sortByValue:any,filterByValue:any){
    
    this.totalSpendingOfCategory = this.unFilteredList.filter(b=> filterByValue !== undefined ? b.category===filterByValue: true);
    this.budgetLength = (this.budgetList.filter(b=> filterByValue !== undefined ? b.category===filterByValue:true)).length;
    
  }
  

  getBudgets(month:any,year:any){
    this.budgetService.getBudgets(month,year).subscribe(
      (response:any)=>{
        this.budgetList = response.data;
        // console.log(this.budgetList);
        this.budgetLength = this.budgetList.length;
        this.isLoaded = true;
      }
    );
  }

  selectDate(date:any){
    this.budgetService.updateDate({month:date.month,year:date.year})
  }

  getTotalExpenseByCategory(month:any,year:any){
    this.budgetService.getTotalSpendingOfCategory(month,year).subscribe(
      (response:any)=>{
        this.totalSpendingOfCategory = response.data
        this.unFilteredList = this.totalSpendingOfCategory;
        // console.log(this.totalSpendingOfCategory);
        
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
      this.editId = option.data;
      this.dialogLabel = 'Edit Budget'
      this.isEditOpen = true;
      // console.log(this.isEditOpen);
      this.openDialogue('edit',this.editId);
      
    }
    else if(option.operation==='delete'){
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
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
            this.messageService.add({ severity: 'error', summary: 'Confirmed', detail: 'Record deleted' });
            this.deleteBudget(option.data);
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
        },
      });
      
    }
    else{
      this.openDisplay(option.data);
    }
  }

  navigateToTransaction(category:any){
    let expenseCategories = Object.values(ExpenseCategory);
    let investmentCategories = Object.values(InvestmentCategory);

    if(expenseCategories.findIndex((e)=>e === category)!== -1){
      this.router.navigate(['/expenses'],{queryParams:{category:category}});
    }
    else{
      this.router.navigate(['/investments'],{queryParams:{category:category}});
    }
  }

  // load modal renamed

  loadAddComponent(){
    this.vcr.clear();
    this.compRef = this.vcr.createComponent(AddBudgetComponent);

    if(this.compRef){
      this.compRef.instance.closeEvent.subscribe(
        (res:any)=>{
          this.closeDialogue();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Budget added' });
        }
      )
    }
  }

  loadEditComponent(editId:any) {
    this.vcr.clear();
    this.compRef = this.vcr.createComponent(EditBudgetComponent);
    this.compRef.setInput('id',editId);
  
    this.compRef.instance.closeEvent.subscribe(
      (res: any) => {
        console.log(res);
        
        this.closeDialogue();
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Budget is updated' });
      }
    );
  }

  openDialogue(value:'add'|'edit',editId?:number){
    this.isDialogVisible = true;

    if(value==='add'){
      this.loadAddComponent();
      this.dialogLabel = 'Add Budget'
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

  closeModal(){
    this.isAddOpen = false;
    this.vcr.clear();
  }

  loadDisplayComponent(value:any){
    this.vcr.clear();
    this.budgetService.getBudgetById(value).subscribe(
      (res:any)=>{
        let {id,...inputData} = res.data;
        this.compRef = this.loadDynamicComponentDirective.vcr.createComponent(GenericDisplayDetailsComponent);
        this.compRef.setInput('inputData',inputData);
      }
    )
  }

  openDisplay(value:any){
    this.isDialogVisible = true;
    this.dialogLabel = value.category;
    this.loadDisplayComponent(value);
  }
}
