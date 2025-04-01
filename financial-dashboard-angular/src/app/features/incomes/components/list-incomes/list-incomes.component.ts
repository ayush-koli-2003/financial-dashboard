import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../../../core/models/Income.model';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { EditIncomeComponent } from '../edit-income/edit-income.component';

@Component({
  selector: 'app-list-incomes',
  standalone: false,
  templateUrl: './list-incomes.component.html',
  styleUrl: './list-incomes.component.css'
})
export class ListIncomesComponent implements OnInit, AfterViewInit{
  incomeList:Income[]
  month:any;
  year:any;
  isAddOpen: boolean=false;

  isEditOpen = false;
  isDialogVisible = false;
  dialogLabel:string='';
  editId!:number;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponentDirective!:LoadDynamicComponentDirective
  vcr!: ViewContainerRef;
  compRef!: ComponentRef<any>;
  constructor(private incomeService:IncomeService){
    this.incomeList=[]
  }

  ngOnInit(): void {
    let date = new Date();
    this.month = date.getMonth()+1;
    this.year = date.getFullYear();
    this.incomeService.updateIncomeListObs$.subscribe(
      ()=>{
        this.getIncomes(this.month,this.year);
      }
    )
  }

  ngAfterViewInit(): void {
    this.vcr = this.loadDynamicComponentDirective.vcr;
  }

  getIncomes(month:any,year:any){
    this.incomeService.getIncomes(month,year).subscribe(
      (response:any)=>{
        this.incomeList = response.data
      }
    )
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
    this.getIncomes(date.month,date.year);
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
    else{
      this.deleteIncome(option.data);
    }
  }

    loadAddComponent(){
      this.vcr.clear();
      this.compRef = this.vcr.createComponent(AddIncomeComponent);
  
      if(this.compRef){
        this.compRef.instance.closeEvent.subscribe(
          (res:any)=>{
            this.closeModal();
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
  
    closeModal(){
      this.compRef.destroy();
      
      this.isAddOpen = false;
    }
}
