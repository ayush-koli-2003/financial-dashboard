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
    console.log(this.id);
    
    this.selectOption.emit({data:this.id,operation:'edit'});
  }

  emitDelete(){
    this.selectOption.emit({data:this.id,operation:'delete'});
  }

  emitOpen(){
    this.selectOption.emit({data:this.id,operation:'open'});
  }
}
