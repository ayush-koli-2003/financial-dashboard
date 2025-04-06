import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  standalone: false,
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent {
  @Input() form!: FormGroup;
  @Input() categories:any[]=[];
  @Input() errorMessages:{[key:string]:string}={};
  @Input() inputControls!:{name:string,label:string,type:string}[];
  @Input() formType!:'add'|'edit';
  @Input() editData:any;
  @Output() submitEvent = new EventEmitter();
  @Input() serverError!:string[];

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
        this.formLabel = 'Update';        
      }
    }
    
    if(changes['editData'] && this.editData !== undefined){
      this.form.patchValue(this.editData);
    }

    if(changes['serverError']){
      console.log(this.serverError);
      
      if(this.serverError){
        this.isSubmitted = false;
        console.log(this.isSubmitted);
        
      }
    }
  }

  emitEvent(value:any){
    this.submitEvent.emit(value);
  }

  onSubmit(){
    if(this.form.valid){
      // console.log(this.addForm.value);
      this.isSubmitted = true
      this.emitEvent(this.form.value);
    }
  }

  onCancel(){
    this.submitEvent.emit('exit');
  }
}
