import { Component, OnInit } from '@angular/core';
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

  onSubmit(){
    if(this.addBudgetForm.valid){
      this.isSubmitted = true;
      this.budgetService.addBudget(this.addBudgetForm.value).subscribe(
        ()=>{
          this.router.navigate(["../"],{relativeTo:this.route})
        }
      );
      
    }
  }
}
