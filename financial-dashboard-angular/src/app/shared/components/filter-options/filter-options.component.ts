import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, throttleTime } from 'rxjs';

@Component({
  selector: 'app-filter-options',
  standalone: false,
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.css'
})
export class FilterOptionsComponent implements OnInit,OnChanges {
  @Input() categories:any[]=[];
  @Output() addEvent= new EventEmitter();
  @Output() filterEvent = new EventEmitter();
  @Output() dateEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  @Input() currDate!:{month:string,year:string};
  @Input() disableFields!:{isSearchDisabled?:boolean,isSortDisabled?:boolean,isFilterDisabled?:boolean};
  groupOptions= ['Day','Category'];
  sortOptions = ['Low to High','High to Low','None']
  sortByValue:any;
  filterByValue:any;
  searchQuery:string='';
  searchControl = new FormControl();
  ngOnInit(){
    this.searchControl.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(
      (res)=>{
        this.searchEvent.emit(this.searchQuery);
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['categories']){
      // console.log(this.categories);
      this.categories.push('None')
    }
  }

  emitButton(){
    this.addEvent.emit();
  }

  emitFilter(){
    // console.log(this.groupByValue,this.sortByValue,this.filterByValue);
    if(this.filterByValue==='None'){
      this.filterByValue = undefined;
    }

    if(this.sortByValue === 'None'){
      this.sortByValue = undefined;
    }
    this.filterEvent.emit({filterBy:this.filterByValue,sortBy:this.sortByValue})
  }

  selectDate(value:any){
    this.dateEvent.emit(value);
  }

  resetFilter(){
    this.sortByValue=undefined
    this.filterByValue=undefined

    this.emitFilter();
  }

  emitSearch(){
    this.searchEvent.emit(this.searchQuery);
  }
}
