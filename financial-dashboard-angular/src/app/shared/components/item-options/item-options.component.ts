import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-options',
  standalone: false,
  templateUrl: './item-options.component.html',
  styleUrl: './item-options.component.css'
})
export class ItemOptionsComponent {
  @Input() id!:number;
  @Output() selectOption = new EventEmitter();

  emitEdit(){
    this.selectOption.emit({data:this.id,operation:'edit'});
  }

  emitDelete(){
    this.selectOption.emit({data:this.id,operation:'delete'});
  }
}
