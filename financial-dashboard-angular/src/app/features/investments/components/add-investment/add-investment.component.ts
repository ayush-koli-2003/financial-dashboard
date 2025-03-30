import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InvestmentService } from '../../services/investment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-investment',
  standalone: false,
  templateUrl: './add-investment.component.html',
  styleUrl: './add-investment.component.css'
})
export class AddInvestmentComponent implements OnInit {
  addInvestmentForm:FormGroup;
  categories:any;
  @Output() closeEvent = new EventEmitter();
  inputControls= [{name:'category',label:'Investment Category',type:'select'},{name:'name',label:'Name',type:'text'},{name:'note',label:'Note',type:'text'},{name:'amount',label:'Amount',type:'number'}]
  constructor(private investmentService:InvestmentService,private router:Router,private route:ActivatedRoute){
    this.addInvestmentForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      note: new FormControl(null),
      amount: new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")]),
      category: new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
    this.investmentService.getCategories().subscribe(
      (response:any)=>{
        this.categories = response.data;
      }
    );
  }

  onSubmit(value:any){
    this.investmentService.addInvestment(value).subscribe(
      ()=>{
        this.closeEvent.emit();
      }
    )
  }
}
