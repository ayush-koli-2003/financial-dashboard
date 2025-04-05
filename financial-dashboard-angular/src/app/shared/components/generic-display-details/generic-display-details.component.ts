import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generic-display-details',
  standalone: false,
  templateUrl: './generic-display-details.component.html',
  styleUrl: './generic-display-details.component.css'
})
export class GenericDisplayDetailsComponent implements OnChanges {
  @Input() inputData:any;
  keys: any[]=[]

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputData']){
      this.keys = Object.keys(this.inputData)
    }
  }
}
