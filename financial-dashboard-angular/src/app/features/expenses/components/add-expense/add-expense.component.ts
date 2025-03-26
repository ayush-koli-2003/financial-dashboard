import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../../../core/models/Expense.model';
import { ExpenseCategory } from '../../../../core/enums/expense-category.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  standalone: false,
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  addExpenseForm:FormGroup;
  categories:any[]=[]
  // expenseId:number,
  //   expenseName:string,
  //   expenseNote:string,
  //   expenseCategory:string,
  //   expenseAmount:number,
  //   expenseDate:Date,

  constructor(private expenseService:ExpenseService,private router:Router,private route:ActivatedRoute){
    this.addExpenseForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      note: new FormControl(''),
      category: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")]),
    })
  }

  ngOnInit(){
    this.expenseService.getExpenseCategories().subscribe(
      (response:any)=>{
        this.categories = response.data;
      }
    )
  }

  onSubmit(){
    
    if(this.addExpenseForm.valid){
      let expense = this.addExpenseForm.value;
      
      this.expenseService.addExpense(expense).subscribe(
        (res:any)=>{
          if(res.status === 'successfull'){
            this.router.navigate(['../'],{relativeTo:this.route})
          }
        }
      );

      
    }
  }
}
