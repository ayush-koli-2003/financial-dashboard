import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetsService } from '../../services/budgets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-budget',
  standalone: false,
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.css'
})
export class AddBudgetComponent implements OnInit {
  addBudgetForm:FormGroup;
  categories:any;
  isSubmitted=false;
  inputControls = [{name:'category',label:'Budget Category',type:'select'},{name:'amount',label:'Amount',type:'number'}];
  serverError!:string[];
  @Output() closeEvent = new EventEmitter();
  
  constructor(private budgetService:BudgetsService,private router:Router,private route:ActivatedRoute){
    this.addBudgetForm= new FormGroup({
      category: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")])
    })
  }

  ngOnInit(){
    this.budgetService.updateBudgetObs$.subscribe(
      ()=>{
        this.budgetService.getCategories().subscribe(
          (response:any)=>{
            this.categories = response.data;
          }
        );
      }
    )
  }

  onSubmit(value:any){
      this.isSubmitted = true;
      this.serverError = [];
      this.budgetService.addBudget(value).subscribe({
        next:()=>{
          this.closeEvent.emit();
        },
        error:(err:any)=>{
          this.serverError?.push(err);
          throw err;
        }
      });
  }
}
