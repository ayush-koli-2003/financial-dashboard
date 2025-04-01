import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Investment } from '../../../../core/models/Investment.model';
import { InvestmentService } from '../../services/investment.service';
import { LoadDynamicComponentDirective } from '../../../../shared/directives/load-dynamic-component.directive';
import { AddInvestmentComponent } from '../add-investment/add-investment.component';
import { EditInvestmentComponent } from '../edit-investment/edit-investment.component';

@Component({
  selector: 'app-list-investments',
  standalone: false,
  templateUrl: './list-investments.component.html',
  styleUrl: './list-investments.component.css'
})
export class ListInvestmentsComponent implements OnInit {
  investmentList:Investment[];
  month:any;
  year:any;
  isAddOpen: boolean=false;
  
  @ViewChild(LoadDynamicComponentDirective) loadDynamicComponentDirective!:LoadDynamicComponentDirective
  vcr!: ViewContainerRef;
  compRef!: ComponentRef<any>;
  isDialogVisible: boolean= false;
  dialogLabel: string='';
  editId: any;
  isEditOpen: boolean=false;

  constructor(private investmentService:InvestmentService){
    this.investmentList=[]
  }

  ngOnInit(): void {
    let date = new Date();
    this.month = date.getMonth()+1;
    this.year = date.getFullYear();
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
      this.editId = option.data;
      this.dialogLabel = 'Edit Investment'
      this.isEditOpen = true;
      this.openDialogue('edit',this.editId);
    }
    else{
      this.deleteInvestment(option.data);
    }
  }

  // loadModal(){
  //   this.isAddOpen = true;
  //   this.vcr.clear();
  //   this.compRef = this.vcr.createComponent(AddInvestmentComponent);

  //   if(this.compRef){
  //     this.compRef.instance.closeEvent.subscribe(
  //       (res:any)=>{
  //         this.closeModal();
  //       }
  //     )
  //   }
  // }

  // closeModal(){
  //   this.compRef.destroy();
    
  //   this.isAddOpen = false;
  // }

  closeDialogue() {
    console.log('closed');
    
    this.isDialogVisible = false;
    if (this.vcr) {
      this.vcr.clear();
    }
  }

  loadAddComponent(){
    this.vcr.clear();
    this.compRef = this.vcr.createComponent(AddInvestmentComponent);

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
    this.compRef = this.vcr.createComponent(EditInvestmentComponent);
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
      this.dialogLabel = 'Add Investment'
    }
    else{
      this.loadEditComponent(editId);
    }
  }
}
