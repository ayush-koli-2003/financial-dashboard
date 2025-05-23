import { AfterViewChecked, AfterViewInit, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../../../core/models/Income.model';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { EditIncomeComponent } from '../edit-income/edit-income.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GenericDisplayDetailsComponent } from '../../../../shared/components/generic-display-details/generic-display-details.component';

@Component({
  selector: 'app-list-incomes',
  standalone: false,
  templateUrl: './list-incomes.component.html',
  styleUrl: './list-incomes.component.css'
})
export class ListIncomesComponent implements OnInit, AfterViewChecked{
  incomeList:Income[]
  currDate!:{month:string,year:string};
  isAddOpen: boolean=false;

  isEditOpen = false;
  isDialogVisible = false;
  dialogLabel:string='';
  editId!:number;
  isDataLoaded=false;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponentDirective!:LoadDynamicComponentDirective
  vcr!: ViewContainerRef;
  compRef!: ComponentRef<any>;
  categories:any[]=[];
  unfilteredList:any[]=[];
  columns=[{field:'category',label:'Category'},{field:'date',label:'Date'},{field:'amount',label:'Amount',tag:true,severity:'success'}];
  searchQuery!:string;
  constructor(private incomeService:IncomeService,private confirmationService: ConfirmationService, private messageService: MessageService){
    this.incomeList=[]
  }

  ngOnInit(): void {
    let date = new Date();
    this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
    this.incomeService.updateDate(this.currDate);
    this.incomeService.updateIncomeListObs$.subscribe(
      ()=>{
        this.searchQuery = this.incomeService.getSearchQuery();
        let date = this.incomeService.getDate();
        this.currDate= {month:date.month,year:date.year};
        this.getIncomes(this.currDate.month,this.currDate.year,this.searchQuery);
        this.getIncomeCategories();
      }
    )
  }

  ngAfterViewChecked(): void {
    if(this.loadDynamicComponentDirective){
      this.vcr = this.loadDynamicComponentDirective.vcr;
    }
  }

  getIncomes(month:any,year:any,search:string){
    this.incomeService.getIncomes(month,year,search).subscribe(
      (response:any)=>{
        this.isDataLoaded = true;
        this.incomeList = response.data
        this.unfilteredList = this.incomeList;
        console.log(this.incomeList[0]);
        
      }
    )
  }

  getIncomeCategories(){
    this.incomeService.getCategories().subscribe({
      next:(res:any)=>{
        this.categories = res.data;
      }
    })
  }

  deleteIncome(id:any){
    this.incomeService.deleteIncome(id).subscribe({
      next:(response:any)=>{
        console.log(response.data);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }

  selectDate(date:any){
    this.incomeService.updateDate({month:date.month,year:date.year})
  }

  selectEvent(option:any){
    if(option.operation==='edit'){
      // this.router
      this.editId = option.data;
      console.log(this.editId);
      
      this.isEditOpen = true;
      // console.log(this.isEditOpen);
      this.openDialogue('edit',this.editId);
    }
    else if(option.operation==='delete'){
      this.confirmationService.confirm({
        message: 'Do you want to delete this Income?',
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
            this.messageService.add({ severity: 'error', summary: 'Confirmed', detail: 'Income deleted' });
            this.deleteIncome(option.data);
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

  loadAddComponent(){
    this.vcr.clear();
    this.compRef = this.vcr.createComponent(AddIncomeComponent);

    if(this.compRef){
      this.compRef.instance.closeEvent.subscribe(
        (res:any)=>{
          this.closeDialogue();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Income added' });
        }
      )
    }
  }

  loadEditComponent(editId:any) {
    this.vcr.clear();
    this.compRef = this.vcr.createComponent(EditIncomeComponent);
    this.compRef.setInput('id',editId);
  
    this.compRef.instance.closeEvent.subscribe(
      (res: any) => {
        console.log(res);
        
        this.closeDialogue();
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Income is updated' });
      }
    );
  }

  openDialogue(value:'add'|'edit',editId?:number){
    this.isDialogVisible = true;

    if(value==='add'){
      this.loadAddComponent();
      this.dialogLabel = 'Add Income'
    }
    else{
      this.loadEditComponent(editId);
      this.dialogLabel = 'Edit Income'
    }
  }

  closeDialogue() {
    this.isDialogVisible = false;
    if (this.vcr) {
      this.vcr.clear();
    }
  }

  takeSearch(search:string){
    this.incomeService.updateSearchQuery(search);
  }

  closeModal(){
    this.compRef.destroy();
    
    this.isAddOpen = false;
  }

  takeFilters(filters:any){
    console.log(filters);
    this.incomeList = this.unfilteredList
    if(filters.sortBy || filters.filterBy){
      this.applyFilters(filters.sortBy,filters.filterBy)
    }
  }

  applyFilters(sortByValue:any,filterByValue:any){
    this.incomeList = this.unfilteredList.filter(e=> filterByValue !== undefined ? e.category===filterByValue: true)
      .sort((a,b)=> sortByValue===undefined ? 0 : sortByValue==='Low to High' ? a.amount-b.amount:b.amount-a.amount)
  }

  loadDisplayComponent(value:any){
    this.vcr.clear();
    this.incomeService.getIncomeById(value).subscribe(
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
