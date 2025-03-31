import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-edit-expense',
  standalone: false,
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
  @Input() id:any;
  editExpenseForm:FormGroup;
  categories:any[]=[];
  isSubmitted=false;
  inputControls = [{name:'name',label:'Name',type:'text'},{name:'note',label:'Note',type:'text'},{name:'amount',label:'Amount',type:'number'},{name:'category',label:'Expense Category',type:'select'}];
  editData:any;
  @Output() closeEvent = new EventEmitter();
  // expenseId:number,
  //   expenseName:string,
  //   expenseNote:string,
  //   expenseCategory:string,
  //   expenseAmount:number,
  //   expenseDate:Date,

  constructor(private expenseService:ExpenseService,private router:Router,private route:ActivatedRoute){
    this.editExpenseForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      note: new FormControl(''),
      category: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")]),
    })
  }

  ngOnInit(){
    this.expenseService.getExpenseCategories().subscribe({
      next:(response:any)=>{
        this.categories = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.expenseService.getExpenseById(this.id).subscribe({
      next:(response:any)=>{
        this.editData = response.data;
        console.log(this.editData);
      }
    })
  }

  onSubmit(value:any){
    if(value === 'exit'){
      this.closeEvent.emit('exit');
    }
    else{
      let expense = value;
            
      this.expenseService.editExpense(expense,this.id).subscribe(
        (res:any)=>{
          if(res.status === 'successfull'){
            this.closeEvent.emit('edited');
          }
        }
      );
    } 
  }
}
