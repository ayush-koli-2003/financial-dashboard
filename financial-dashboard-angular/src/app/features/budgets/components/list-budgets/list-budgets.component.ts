import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { BudgetsService } from '../../services/budgets.service';
import { Budget } from '../../../../core/models/Budget.model';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';

@Component({
  selector: 'app-list-budgets',
  standalone: false,
  templateUrl: './list-budgets.component.html',
  styleUrl: './list-budgets.component.css'
})
export class ListBudgetsComponent implements OnInit, AfterViewInit{
  budgetList:Budget[];
  month:any;
  year:any;
  isLoaded = false;
  isAddOpen = false;
  totalSpendingOfCategory:any[]=[];

  isEditOpen = false;
  isDialogVisible = false;
  dialogLabel:string='';
  editId!:number;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponentDirective!:LoadDynamicComponentDirective;
  vcr!:any;
  compRef!:ComponentRef<any>;
  constructor(private budgetService:BudgetsService){
    this.budgetList=[];
  }

  ngOnInit(): void {
    let date = new Date();
    this.month = date.getMonth()+1;
    this.year = date.getFullYear();
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

  ngAfterViewInit(): void {
    this.vcr = this.loadDynamicComponentDirective.vcr;
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
      this.editId = option.data;
      this.dialogLabel = 'Edit Budget'
      this.isEditOpen = true;
      // console.log(this.isEditOpen);
      this.openDialogue('edit',this.editId);
      
    }
    else if(option.operation==='delete'){
      
      this.deleteBudget(option.data);
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
}
