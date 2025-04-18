import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-no-record',
  standalone: false,
  templateUrl: './no-record.component.html',
  styleUrl: './no-record.component.css'
})
export class NoRecordComponent {
  @Input() record:string='Record';
  @Output() addEvent:EventEmitter<string> = new EventEmitter();

  onAdd(){
    this.addEvent.emit('add');
  }
}
