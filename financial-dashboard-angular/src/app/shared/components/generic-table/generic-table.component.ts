import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent implements OnChanges{
  @Input() inputData:any[]=[];
  @Input() columns!:{field:string,label:string,tag?:boolean,severity?:string}[];
  @Output() selectActionEvent= new EventEmitter();
  isDataLoaded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputData']){
      this.isDataLoaded = true;
    }
  }

  selectEvent(value:any){
    this.selectActionEvent.emit(value);
  }
}
