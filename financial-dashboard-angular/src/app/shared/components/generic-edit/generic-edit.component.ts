import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-edit',
  standalone: false,
  templateUrl: './generic-edit.component.html',
  styleUrl: './generic-edit.component.css'
})
export class GenericEditComponent {
  @Input() header!:string;
  @Input() visible!:boolean;
  @Input() id!:number;

  ngOnInit(){
    
  }
}
