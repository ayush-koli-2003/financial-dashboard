import { AfterViewChecked, AfterViewInit, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../../../core/models/Expense.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { DisplayTransactionComponent } from '../../../../shared/components/display-transaction/display-transaction.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { filter, Observable, Subscription } from 'rxjs';
import { GenericDisplayDetailsComponent } from '../../../../shared/components/generic-display-details/generic-display-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-expenses',
  standalone: false,
  templateUrl: './list-expenses.component.html',
  styleUrl: './list-expenses.component.css'
})
export class ListExpensesComponent implements OnInit, AfterViewChecked {
  expenseList:Expense[]=[];
  unfilteredList:any[]=[];
  currDate!:{month:string,year:string};
  categories:any[]=[];

  isAddOpen = false;

  isEditOpen = false;

  isDialogVisible = false;
  dialogLabel:string='';

  editId!:number;

  isDataLoaded:boolean = false;

  filter:{filterBy?:any,sortBy?:any}={};

  searchQuery!:string;

  totalRecords!:number;

  limit:number=6;
  offset:number=0;

  queryParamSub!:Subscription;

  columns=[{field:'name',label:'Name'},{field:'date',label:'Date',tag:undefined,severity:undefined},{field:'category',label:'Category'},{field:'amount',label:'Amount',tag:true,severity:'danger'}];

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponent!:LoadDynamicComponentDirective;
  compRef!:ComponentRef<any>;
  vcr:any;
  constructor(private route:ActivatedRoute,private expenseService:ExpenseService, private router:Router,private confirmationService: ConfirmationService, private messageService: MessageService){
  }

  ngOnInit(): void {
    let date = new Date();
    this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
    
    // console.log('break point');
    
    this.expenseService.updateExpenseList$.subscribe(()=>{
      let date = this.expenseService.getDate();
      // this.month = date.month;
      // this.year = date.year;
      this.searchQuery = this.expenseService.getSearchQuery();
      this.filter = this.expenseService.getFilters();
      // console.log('Search init: '+this.searchQuery);
      console.log(this.filter);
      
      this.currDate= {month:date.month,year:date.year};
      this.getTotalRecords(this.currDate.month,this.currDate.year,this.searchQuery,this.filter.filterBy,this.filter.sortBy);
      this.getExpenses(this.currDate.month,this.currDate.year,this.searchQuery,this.limit,this.offset,this.filter.filterBy,this.filter.sortBy);
      this.getExpenseCategories();
    })

    this.queryParamSub = this.route.queryParams.subscribe(
      (map:any)=>{
        if(map.category!==undefined){
          this.takeFilters({sortBy:undefined,filterBy:map.category})
        }
      }
    )

    
    this.expenseService.updateDate(this.currDate);

  }

  ngAfterViewChecked(): void {
    if(this.loadDynamicComponent){      
      this.vcr = this.loadDynamicComponent.vcr;
    }
  }

  takeFilters(filters:any){
    // this.expenseList = this.unfilteredList
    // console.log(filters);
    
    
    // console.log(this.filter);
    
    if(filters.sortBy==='Low to High'){
      filters.sortBy = 'ASC'
    }
    else if(filters.sortBy==='High to Low'){
      filters.sortBy = 'DESC'
    }

    this.filter.filterBy = filters.filterBy;
    this.filter.sortBy = filters.sortBy;
    console.log(this.filter);
    
    this.expenseService.updateFilters(filters);
    
  }

  getExpenses(month:any,year:any,search:string,limit:number,offset:number,filterBy?:string,sortBy?:string){
    this.expenseService.getExpenseList(month,year,search,limit,offset,filterBy,sortBy).subscribe(
      (response:any)=>{
        this.expenseList = response.data;
        this.unfilteredList = this.expenseList;
        this.isDataLoaded = true;
        // console.log(this.expenseList[0]);
        // console.log(this.filter);
        
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
    
    // this.expenseList = this.unfilteredList.filter(e=> filterByValue !== undefined ? e.category as string===filterByValue : true)
    // .sort((a,b)=> sortByValue===undefined ? 0 : sortByValue==='Low to High' ? a.amount-b.amount:b.amount-a.amount);
    if(sortByValue==='Low to High'){
      sortByValue = 'ASC'
    }
    else{
      sortByValue = 'DESC'
    }
    this.getExpenses(this.currDate.month,this.currDate.year,this.searchQuery,this.limit,this.offset,filterByValue,sortByValue);
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
    else{
      this.openDisplay(option.data);
      
    }
  }

  loadAddComponent() {
    // console.log(this.vcr);
    
    this.vcr?.clear();
      this.compRef = this.loadDynamicComponent.vcr.createComponent(AddExpenseComponent);
    
      this.compRef.instance.closeEvent.subscribe(
        (res: any) => {
          // console.log(res);
          
          this.closeDialogue();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense added' });
        }
      );
  }

  loadEditComponent(editId:any) {
    
    this.vcr?.clear();
    this.compRef = this.loadDynamicComponent.vcr.createComponent(EditExpenseComponent);
    this.compRef.setInput('id',editId);
  
    this.compRef.instance.closeEvent.subscribe(
      (res: any) => {
        console.log(res);
        
        this.closeDialogue();
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Expense is updated' });
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
    
    this.expenseService.updateDate({month:data.month,year:data.year})
  }

  loadDisplayComponent(value:any){
    this.vcr?.clear();
    this.expenseService.getExpenseById(value).subscribe(
      (res:any)=>{
        let {id,...inputData} = res.data;
        this.compRef = this.loadDynamicComponent.vcr.createComponent(GenericDisplayDetailsComponent);
        this.compRef.setInput('inputData',inputData);
      }
    )
  }

  openDisplay(value:any){
    this.isDialogVisible = true;
    this.dialogLabel = value.category;
    this.loadDisplayComponent(value);
  }

  takeSearch(search:string){
    // console.log(search);
    
    this.expenseService.updateSearchQuery(search);
  }

  getTotalRecords(month:any,year:any,search:string,filterBy?:string,sortBy?:string){
    console.log(filterBy,sortBy);
    
    this.expenseService.getTotalExpenseRecord(month,year,search,filterBy,sortBy).subscribe({
      next:(res:any)=>{
        this.totalRecords = res.data;
      }
    })
  }

  changePage(value:{limit:number,offset:number}){
    this.limit=value.limit;
    this.offset=value.offset;
    this.getExpenses(this.currDate.month,this.currDate.year,this.searchQuery,this.limit,this.offset,this.filter.filterBy,this.filter.sortBy);
  }

  ngOnDestroy(){
    console.log('unsubscribed');
    
    this.queryParamSub.unsubscribe();
  }
}
