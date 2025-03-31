import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-add-item',
  standalone: false,
  templateUrl: './generic-add-item.component.html',
  styleUrl: './generic-add-item.component.css'
})
export class GenericAddItemComponent implements OnInit {
  @Input() addForm!: FormGroup;
  @Output() submitEvent = new EventEmitter();
  @Input() categories:any[]=[];
  @Input() errorMessages:{[key:string]:string}={};
  @Input() inputControls!:{name:string,label:string,type:string}[];
  @Input() formType!:'add'|'edit';

  formLabel!:string;
  isSubmitted!:boolean;

  ngOnInit(): void {
    this.isSubmitted = false;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['formType']){
      if(this.formType==='add'){
        this.formLabel = 'Add'
      }
      else{
        this.formLabel = 'Edit'
      }
    }
  }

  emitEvent(value:any){
    this.submitEvent.emit(value);
  }

  onSubmit(){
    if(this.addForm.valid){
      // console.log(this.addForm.value);
      this.isSubmitted = true
      this.emitEvent(this.addForm.value);
    }
  }

  onCancel(){
    this.submitEvent.emit('exit');
  }
}
