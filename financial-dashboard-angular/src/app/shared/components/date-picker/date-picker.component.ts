import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-date-picker',
  standalone: false,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  date: Date[] | undefined;
  @Output() dateEvent = new EventEmitter();

  dateSelected(){
    let month = this.date?.toLocaleString().split(',')[0].split('/')[0];
    let year = this.date?.toLocaleString().split(',')[0].split('/')[2]
    this.dateEvent.emit({month,year});
  }
}
