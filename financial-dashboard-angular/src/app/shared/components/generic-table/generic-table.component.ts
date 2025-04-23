import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent implements OnChanges{
  @Input() inputData:any[]=[];
  @Input() columns!:{field:string,label:string,tag?:boolean,severity?:string}[];
  @Input() totalRecords!:number;
  @Output() selectActionEvent= new EventEmitter();
  @Output() pageChangeEvent = new EventEmitter();
  first: number = 0;
  rows: number = 6;
  isDataLoaded = false;
  

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputData']){
      this.isDataLoaded = true;
    }
  }

  selectEvent(value:any){
    console.log(value);
    
    this.selectActionEvent.emit(value);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 6;
    // console.log(this.rows,this.first);
    this.pageChangeEvent.emit({limit:this.rows,offset:this.first});
  }
}
