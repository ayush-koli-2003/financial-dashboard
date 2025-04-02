import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-transaction',
  standalone: false,
  templateUrl: './display-transaction.component.html',
  styleUrl: './display-transaction.component.css'
})
export class DisplayTransactionComponent {
  @Input() data:any;
  keys:any;
  isDataLoaded= false;

  ngOnChanges(changes:SimpleChanges){
    if(changes['data']){
      this.isDataLoaded = true;
      // console.log(this.data);
      this.keys = Object.keys(this.data);
    }
  }
}
