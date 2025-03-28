import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeCategory } from '../../../../core/enums/income-category.enum';

@Component({
  selector: 'app-add-income',
  standalone: false,
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.css'
})
export class AddIncomeComponent{
  addIncomeForm:FormGroup;
  incomeCategories:any[]=[];
  isSubmitted = false;

  constructor(private incomeService:IncomeService,private router:Router,private route:ActivatedRoute){
    this.addIncomeForm=new FormGroup({
      category: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")]),
      note: new FormControl('')
    })
  }

  ngOnInit(){
    this.incomeService.getCategories().subscribe(
      (response:any)=>{
        this.incomeCategories = response.data
      }
    )
  }

  onSubmit(){
    if(this.addIncomeForm.valid){
      this.isSubmitted = true;
      this.incomeService.addIncome(this.addIncomeForm.value).subscribe(
        (response)=>{
          this.router.navigate(["../"],{relativeTo:this.route})
        }
      );
      
    }
  }
}
