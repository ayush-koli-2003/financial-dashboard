import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../../../core/models/Income.model';

@Component({
  selector: 'app-list-incomes',
  standalone: false,
  templateUrl: './list-incomes.component.html',
  styleUrl: './list-incomes.component.css'
})
export class ListIncomesComponent implements OnInit{
  incomeList:Income[]
  month:any = '3';
  year:any = '';
  constructor(private incomeService:IncomeService){
    this.incomeList=[]
  }

  ngOnInit(): void {
    this.incomeService.updateIncomeListObs$.subscribe(
      ()=>{
        this.getIncomes(this.month,this.year);
      }
    )
  }

  getIncomes(month:any,year:any){
    this.incomeService.getIncomes(month,year).subscribe(
      (response:any)=>{
        this.incomeList = response.data
      }
    )
  }

  selectDate(date:any){
    this.getIncomes(date.month,date.year);
  }
}
