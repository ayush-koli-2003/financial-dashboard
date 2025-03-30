import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Investment } from '../../../../core/models/Investment.model';
import { InvestmentService } from '../../services/investment.service';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddInvestmentComponent } from '../add-investment/add-investment.component';

@Component({
  selector: 'app-list-investments',
  standalone: false,
  templateUrl: './list-investments.component.html',
  styleUrl: './list-investments.component.css'
})
export class ListInvestmentsComponent implements OnInit {
  investmentList:Investment[];
  month:any = '3';
  year:any = '';
  isAddOpen: boolean=false;
  
  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponentDirective!:LoadDynamicComponentDirective
  vcr!: ViewContainerRef;
  compRef!: ComponentRef<any>;

  constructor(private investmentService:InvestmentService){
    this.investmentList=[]
  }

  ngOnInit(): void {
    this.investmentService.updateInvestementListObs$.subscribe(
      ()=>{
        this.getInvestments(this.month,this.year);
      }
    )
  }

  ngAfterViewInit(){
    this.vcr = this.loadDynamicComponentDirective.vcr;
  }

  getInvestments(month:any,year:any){
    this.investmentService.getInvestments(month,year).subscribe(
      (response:any)=>{
        this.investmentList = response.data;
      }
    )
  }

  selectDate(data:any){
    // console.log(data); 
    
    this.getInvestments(data.month,data.year);
  }

  deleteInvestment(id:any){
    this.investmentService.deleteInvestment(id).subscribe({
      next:(response:any)=>{
        
      },
      error:(err)=>{
        
      }
    });
  }

  selectEvent(option:any){
    if(option.operation==='edit'){
      // this.router
    }
    else{
      this.deleteInvestment(option.data);
    }
  }

  loadModal(){
    this.isAddOpen = true;
    this.vcr.clear();
    this.compRef = this.vcr.createComponent(AddInvestmentComponent);

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
