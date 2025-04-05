import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-edit-income',
  standalone: false,
  templateUrl: './edit-income.component.html',
  styleUrl: './edit-income.component.css'
})
export class EditIncomeComponent {
  @Input() id:any;
  categories:any[]=[];
  isSubmitted=false;
  editData:any;
  @Output() closeEvent = new EventEmitter();
  inputControls= [{name:'category',label:'Income Category',type:'select'},{name:'amount',label:'Amount',type:'number'},{name:'note',label:'Note',type:'textarea'}]
  editIncomeForm:FormGroup;

  constructor(private incomeService:IncomeService,private router:Router,private route:ActivatedRoute){
    this.editIncomeForm=new FormGroup({
      category: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")]),
      note: new FormControl('')
    })
  }

  ngOnInit(){
    this.incomeService.getCategories().subscribe(
      (response:any)=>{
        this.categories = response.data
      }
    )

    this.incomeService.getIncomeById(this.id).subscribe(
      (response:any)=>{
        this.editData = response.data;
      }
    )
  }

  onSubmit(value:any){
    if(value === 'exit'){
      this.closeEvent.emit('exit');
    }
    else{
      let income = value;
            
      this.incomeService.editIncome(income,this.id).subscribe(
        (res:any)=>{
          if(res.status === 'successfull'){
            this.closeEvent.emit('edited');
          }
        }
      );
    }
  }
  

}
