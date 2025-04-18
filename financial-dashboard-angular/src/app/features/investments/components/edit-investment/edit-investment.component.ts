import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InvestmentService } from '../../services/investment.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-investment',
  standalone: false,
  templateUrl: './edit-investment.component.html',
  styleUrl: './edit-investment.component.css'
})
export class EditInvestmentComponent implements OnInit,OnChanges {
  editInvestmentForm:FormGroup;
  categories:any[]=[];
  inputControls = [{name:'category',label:'Investment Category',type:'select'},{name:'name',label:'Name',type:'text'},{name:'amount',label:'Amount',type:'number'},{name:'note',label:'Note',type:'textarea'}]
  editData:any;
  serverError!:string[];

  @Input() id!:number;
  @Output() closeEvent = new EventEmitter();

  constructor(private investmentService:InvestmentService, private router:Router,private route:ActivatedRoute){
    this.editInvestmentForm = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.minLength(2)]),
      note: new FormControl(null),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")]),
      category: new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(){
    this.investmentService.getCategories().subscribe({
      next:(response:any)=>{
        this.categories = response.data;
      }
    })
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['id']){
      this.investmentService.getInvestmentById(this.id).subscribe({
        next:(res:any)=>{
          this.editData = res.data;
        }
      })
    }
  }

  onSubmit(value:any){
    if(value === 'exit'){
      this.closeEvent.emit('exit');
    }
    else{
      this.serverError = [];
      this.investmentService.editInvestment(value,this.id).subscribe({
        next:()=>{
          this.closeEvent.emit();
        },
        error:(err:any)=>{
          if(err.status===404){
            this.closeEvent.emit();
            Swal.fire({
              title: `${err.error.message}`,
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
      })
    }
  }

}
