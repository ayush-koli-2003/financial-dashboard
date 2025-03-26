import { Component, OnInit } from '@angular/core';
import { Investment } from '../../../../core/models/Investment.model';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-list-investments',
  standalone: false,
  templateUrl: './list-investments.component.html',
  styleUrl: './list-investments.component.css'
})
export class ListInvestmentsComponent implements OnInit {
  investmentList:Investment[];
  month:any = '3';
  year:any = '';

  constructor(private investmentService:InvestmentService){
    this.investmentList=[]
  }

  ngOnInit(): void {
    this.investmentService.updateInvestementListObs$.subscribe(
      ()=>{
        this.getInvestments(this.month,this.year);
      }
    )
  }

  getInvestments(month:any,year:any){
    this.investmentService.getInvestments(month,year).subscribe(
      (response:any)=>{
        this.investmentList = response.data;
      }
    )
  }

  selectDate(data:any){
    // console.log(data); 
    
    this.getInvestments(data.month,data.year);
  }
}
