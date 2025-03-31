import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetsService } from '../../services/budgets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-budget',
  standalone: false,
  templateUrl: './edit-budget.component.html',
  styleUrl: './edit-budget.component.css'
})
export class EditBudgetComponent implements OnInit,OnChanges {
  @Input() id:any;
  editBudgetForm:FormGroup;
  categories:any[]=[];
  isSubmitted=false;
  inputControls = [{name:'category',label:'Budget Category',type:'select'},{name:'amount',label:'Amount',type:'number'}]
  editData:any;
  @Output() closeEvent = new EventEmitter();

  constructor(private budgetService:BudgetsService,private router:Router,private route:ActivatedRoute){
    this.editBudgetForm = new FormGroup({
      category: new FormControl({value:null,disabled:true},[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")])
    })
  }

  ngOnInit(){
    this.budgetService.getAllCategories().subscribe({
      next:(response:any)=>{
        this.categories =  response.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['id']){
      this.budgetService.getBudgetById(this.id).subscribe({
        next:(response:any)=>{
          this.editData = response.data;
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
  }

  onSubmit(value:any){
    if(value === 'exit'){
      this.closeEvent.emit('exit');
    }
    else{
      let budget = value;
            
      this.budgetService.editBudget(budget,this.id).subscribe(
        (res:any)=>{
          if(res.status === 'successfull'){
            this.closeEvent.emit('edited');
          }
        }
      );
    }
  }
}
