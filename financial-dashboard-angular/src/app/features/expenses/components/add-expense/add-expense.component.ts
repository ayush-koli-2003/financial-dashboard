import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../../../core/models/Expense.model';
import { ExpenseCategory } from '../../../../core/enums/expense-category.enum';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expense',
  standalone: false,
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  addExpenseForm:FormGroup;
  categories:any[]=[];
  isSubmitted=false;
  serverError!:string[];
  inputControls = [{name:'name',label:'Name',type:'text'},{name:'amount',label:'Amount',type:'number'},{name:'category',label:'Expense Category',type:'select'},{name:'note',label:'Note',type:'textarea'}]
  @Output() closeEvent = new EventEmitter();
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

  onSubmit(value:any){
      if(value === 'exit'){
        this.closeEvent.emit('exit');
      }
      else{
        let expense = value;

        this.serverError = [];
        
       
        this.expenseService.addExpense(expense).subscribe({
          next:()=>{
            this.closeEvent.emit();
          },
          error:(err:any)=>{
            if(err.status===404){
              this.closeEvent.emit();
              Swal.fire({
                title: `${err.error.message} for ${expense.catefory}`,
                showCancelButton: true,
                confirmButtonText: "Go To Budgets"
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['../budgets'],{relativeTo:this.route});
                } else if (result.isDenied) {
                  
                }
              });
            }
            else{
              this.serverError?.push(err);
              throw err;
            }
          }
        });

      
      }
    
  }
}
