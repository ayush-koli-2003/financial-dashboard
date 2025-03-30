import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../../../core/models/Income.model';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';

@Component({
  selector: 'app-list-incomes',
  standalone: false,
  templateUrl: './list-incomes.component.html',
  styleUrl: './list-incomes.component.css'
})
export class ListIncomesComponent implements OnInit, AfterViewInit{
  incomeList:Income[]
  month:any = '3';
  year:any = '';
  isAddOpen: boolean=false;

  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponentDirective!:LoadDynamicComponentDirective
  vcr!: ViewContainerRef;
  compRef!: ComponentRef<any>;
  constructor(private incomeService:IncomeService){
    this.incomeList=[]
  }

  ngOnInit(): void {
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
    }
    else{
      this.deleteIncome(option.data);
    }
  }

  loadModal(){
      this.isAddOpen = true;
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
  
    closeModal(){
      this.compRef.destroy();
      
      this.isAddOpen = false;
    }
}
