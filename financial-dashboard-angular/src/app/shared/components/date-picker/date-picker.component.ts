import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-date-picker',
  standalone: false,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements OnChanges{
  date: any | undefined;
  @Output() dateEvent = new EventEmitter();
  @Input() currDate : any;
  maxDate!:Date;
  ngOnInit(){
    this.maxDate = new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currDate']){
      console.log('changed date');
      
      this.date = new Date(parseInt(this.currDate.year),parseInt(this.currDate.month)-1);
      console.log(this.date);
    }

    console.log('change date detected');
    
  }

  dateSelected(){
    let month = this.date?.toLocaleString().split(',')[0].split('/')[0];
    let year = this.date?.toLocaleString().split(',')[0].split('/')[2]
    this.dateEvent.emit({month,year});
  }
}
